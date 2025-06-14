import type { Cookies } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { ObjectParser } from '@pilcrowjs/object-parser';

import {
    generateSessionToken,
    createSession,
    setSessionTokenCookie
} from '$lib/server/api/session';
import { github } from '$lib/server/api/auth/oauth';
import { createUser, getUserFromEmail } from '$lib/server/api/user';
import { AccountType } from '$generated/prisma';
import { createAccount, getAccountWithProviderId } from '$lib/server/api/auth/account';

async function getGithubUserEmail(accessToken: string): Promise<string | null> {
    const emailListRequest = new Request('https://api.github.com/user/emails');
    emailListRequest.headers.set('Authorization', `Bearer ${accessToken}`);
    const emailListResponse = await fetch(emailListRequest);
    const emailListResult: unknown = await emailListResponse.json();

    if (!Array.isArray(emailListResult) || emailListResult.length < 0) {
        return null;
    }

    let email: string | null = null;
    for (const emailRecord of emailListResult) {
        const emailRecordParser = new ObjectParser(emailRecord);
        const emailVerified = emailRecordParser.getBoolean('verified');
        const emailPrimary = emailRecordParser.getBoolean('primary');

        if (emailVerified && emailPrimary) email = emailRecordParser.getString('email');
    }

    return email;
}

export async function GET({ cookies, url }: { cookies: Cookies; url: URL }): Promise<Response> {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = cookies.get('github_oauth_state') ?? null;

    if (code === null || state === null || storedState === null)
        return new Response(null, { status: 400 });

    if (state !== storedState) return new Response(null, { status: 400 });

    let tokens: OAuth2Tokens;
    try {
        tokens = await github.validateAuthorizationCode(code);
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 400 });
    }

    const userRequest = new Request('https://api.github.com/user');
    userRequest.headers.set('Authorization', `Bearer ${tokens.accessToken()}`);
    const userResponse = await fetch(userRequest);
    const userParser = new ObjectParser(await userResponse.json());

    const githubUserId = String(userParser.get('id'));
    const username = userParser.getString('login');
    const avatarUrl = userParser.getString('avatar_url');

    const existsAuthProvider = await getAccountWithProviderId(githubUserId, AccountType.Github);

    // if auth provider is not found in db
    // user visit here first time with github account.
    // we need to create a new user and link it with github account
    if (!existsAuthProvider) {
        const email = await getGithubUserEmail(tokens.accessToken());

        if (email === null) {
            console.error('[PROVIDER: Github] Failed to get user email');
            return new Response('Failed to get user email. Verify your github account.', {
                status: 400
            });
        }

        const user =
            (await getUserFromEmail(email)) || (await createUser(email, username, avatarUrl));

        await createAccount({
            userId: user.id,
            type: AccountType.Github,
            providerId: githubUserId
        });

        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user.id);
        setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
        return new Response(null, { status: 302, headers: { Location: '/' } });
    }

    // if auth provider is exists but not linked to a user
    // we need to get github user email for create a new user and link it with current auth provider
    if (!existsAuthProvider.userId) {
        const email = await getGithubUserEmail(tokens.accessToken());

        if (email === null) {
            console.error('[PROVIDER: Github] Failed to get user email');
            return new Response('Failed to get user email. Verify your github account.', {
                status: 400
            });
        }

        const user = await createUser(email, username, avatarUrl);
        await createAccount({
            userId: user.id,
            type: AccountType.Github,
            providerId: githubUserId
        });

        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user.id);
        setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
        return new Response(null, { status: 302, headers: { Location: '/' } });
    }

    // if auth provider is exists and linked to a user
    // we need to create a session for the user
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existsAuthProvider.userId);
    setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
    return new Response(null, { status: 302, headers: { Location: '/' } });
}

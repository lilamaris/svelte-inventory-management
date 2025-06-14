import type { Cookies } from '@sveltejs/kit';

import { generateState } from 'arctic';
import { github } from '$lib/server/api/oauth';
import { redirect } from '@sveltejs/kit';

export async function GET({ cookies }: { cookies: Cookies }): Promise<Response> {
    const state = generateState();
    const url = github.createAuthorizationURL(state, ['user:email']);

    cookies.set('github_oauth_state', state, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 10,
        sameSite: 'lax'
    });

    return redirect(302, url.toString());
}

import type { Cookies } from '@sveltejs/kit';

import { generateState } from 'arctic';
import { github } from '$lib/server/api/auth/oauth';

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

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    });
}

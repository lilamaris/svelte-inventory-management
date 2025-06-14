import {
    deleteSessionTokenCookie,
    invalidateUserSessions,
    validateSessionToken
} from '$lib/server/api/session';
import type { Cookies } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function GET({ cookies }: { cookies: Cookies }) {
    const token = cookies.get('session');
    if (!token) {
        return redirect(302, '/');
    }

    const { user } = await validateSessionToken(token);
    if (!user) {
        console.error('Invalid session token:', token);
        return redirect(302, '/');
    }

    await invalidateUserSessions(user.id);
    deleteSessionTokenCookie(cookies);
    return redirect(302, '/');
}

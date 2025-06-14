import { deleteSessionTokenCookie } from '$lib/server/api/session';
import type { Cookies } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function GET({ cookies }: { cookies: Cookies }) {
    deleteSessionTokenCookie(cookies);
    return redirect(302, '/');
}

import {
    deleteSessionTokenCookie,
    invalidateUserSessions,
    validateSessionToken
} from '$lib/server/api/session';
import { setToastMessage } from '$lib/server/api/toast';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
    const token = cookies.get('session');
    if (token) {
        const { user } = await validateSessionToken(token);
        if (user) {
            await invalidateUserSessions(user.id);
        }
        deleteSessionTokenCookie(cookies);
    }
    setToastMessage(cookies, {
        message: 'You have been logged out!',
        type: 'success',
        path: '/'
    });
    throw redirect(302, '/');
};

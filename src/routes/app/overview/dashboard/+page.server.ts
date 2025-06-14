import { getToastMessage, setToastMessage } from '$lib/server/api/toast.js';
import { redirect } from '@sveltejs/kit';

export function load({ cookies, locals }) {
    if (locals.session === null || locals.user === null) {
        setToastMessage(cookies, {
            message: 'You are not logged in',
            type: 'error',
            path: '/auth/login'
        });
        return redirect(302, '/auth/login');
    }

    const toast = getToastMessage(cookies);
    return { user: locals.user, session: locals.session, toast };
}

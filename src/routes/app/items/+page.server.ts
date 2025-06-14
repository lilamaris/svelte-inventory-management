import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
    if (locals.session === null || locals.user === null) {
        return redirect(302, '/auth/login');
    }

    return { user: locals.user, session: locals.session };
}

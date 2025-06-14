import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { loginSchema } from '$features/auth/types/authSchema';
import { getUserFromEmail } from '$lib/server/api/user';
import type { ActionState } from '$lib/types';
import {
    createSession,
    generateSessionToken,
    setSessionTokenCookie
} from '$lib/server/api/session';
import { verifyPassword } from '$lib/server/api/auth/password';
import { getAccountPasswordHash } from '$lib/server/api/auth/account';
import { getToastMessage, setToastMessage } from '$lib/server/api/toast';

export function load({ locals, cookies }) {
    if (locals.session !== null && locals.user !== null) {
        setToastMessage(cookies, {
            message: 'You are already logged in!',
            type: 'info',
            path: '/app/overview/dashboard'
        });
        return redirect(302, '/app/overview/dashboard');
    }

    const toast = getToastMessage(cookies);
    return { toast };
}

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        const validateData = loginSchema.safeParse(formData);

        if (!validateData.success) {
            const state: ActionState<typeof loginSchema> = {
                errors: validateData.error.flatten().fieldErrors,
                payload: formData,
                message: 'Invalid data'
            };
            return fail(400, { state });
        }

        const { email, password } = validateData.data;

        const user = await getUserFromEmail(email);

        if (!user) {
            return fail(400, { state: { message: 'Invalid credentials', payload: formData } });
        }

        const passwordHash = await getAccountPasswordHash(user.id);
        if (!passwordHash) {
            return fail(400, {
                state: { message: 'Invalid credentials', payload: formData }
            });
        }
        const validPassword = await verifyPassword(passwordHash, password);

        if (!validPassword) {
            return fail(400, { state: { message: 'Invalid credentials', payload: formData } });
        }

        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user.id);
        setSessionTokenCookie(cookies, sessionToken, session.expiresAt);

        return redirect(302, '/app/overview/dashboard');
    }
};

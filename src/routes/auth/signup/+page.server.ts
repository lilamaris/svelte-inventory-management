import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { signupSchema } from '$features/auth/types/authSchema';
import { createUser, getUserFromEmail } from '$lib/server/api/user';
import type { ActionState } from '$lib/types';
import { checkUserHasAccountType, createAccount } from '$lib/server/api/auth/account';
import { AccountType } from '$generated/prisma';
import { getToastMessage, setToastMessage } from '$lib/server/api/toast';
import {
    createSession,
    generateSessionToken,
    setSessionTokenCookie
} from '$lib/server/api/session';

export function load({ cookies }) {
    const toast = getToastMessage(cookies);
    return { toast };
}

export const actions: Actions = {
    signup: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        const validateData = signupSchema.safeParse(formData);

        if (!validateData.success) {
            const state: ActionState<typeof signupSchema> = {
                errors: validateData.error.flatten().fieldErrors,
                payload: formData,
                message: 'Invalid data'
            };
            return fail(400, { state });
        }

        const { username, email, password } = validateData.data;

        const user = (await getUserFromEmail(email)) || (await createUser(email, username));

        if (await checkUserHasAccountType(user.id, AccountType.Credentials)) {
            setToastMessage(cookies, {
                message: 'User already has credentials account',
                type: 'error',
                path: '/auth/login'
            });
            return redirect(302, '/auth/login');
        }

        await createAccount({
            userId: user.id,
            type: AccountType.Credentials,
            password
        });
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user.id);
        setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
        setToastMessage(cookies, {
            message: 'Your account has been created successfully!',
            type: 'success',
            path: '/app'
        });

        return redirect(302, '/app');
    }
};

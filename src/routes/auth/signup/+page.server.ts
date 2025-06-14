import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { signupSchema } from '$features/auth/types/authSchema';
import { createUser, getUserFromEmail } from '$lib/server/api/user';
import type { ActionState } from '$lib/types';
import { checkUserHasAccountType, createAccount } from '$lib/server/api/auth/account';
import { AccountType } from '$generated/prisma';

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

        // if user is exists with email, we need to check user has credentials account
        // we need to check user has credentials account
        // if user has credentials account, need to block signup and redirect to login page
        // if user doen't have credentials account, need to create new credentials account and link to exists user
        // if user is not exists with email, create new user and create new credentials account and link to new user
        const user = await getUserFromEmail(email);

        if (user) {
            if (await checkUserHasAccountType(user.id, AccountType.Credentials)) {
                return fail(400, { state: { message: 'User already has account' } });
            }
            await createAccount({
                userId: user.id,
                type: AccountType.Credentials,
                password
            });
            const flashMessage = {
                message:
                    'Create credentials successfully. Now you can login with your credentials.',
                type: 'success'
            };
            cookies.set('flash', JSON.stringify(flashMessage), {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30
            });
            return redirect(302, '/auth/login');
        }

        const newUser = await createUser(email, username);
        await createAccount({
            userId: newUser.id,
            type: AccountType.Credentials,
            password
        });

        return redirect(302, '/auth/login');
    }
};

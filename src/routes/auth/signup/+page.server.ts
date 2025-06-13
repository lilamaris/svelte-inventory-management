import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { signupSchema } from '$features/auth/types/authSchema';
import { checkEmailAvailability, createUser } from '$lib/server/api/user';
import type { ActionState } from '$lib/types';

export const actions: Actions = {
    signup: async ({ request }) => {
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

        if (!(await checkEmailAvailability(email))) {
            const state: ActionState<typeof signupSchema> = {
                errors: {
                    email: ['Email already exists']
                },
                payload: formData,
                message: 'Email already exists'
            };
            return fail(400, { state });
        }

        await createUser(email, username, password);

        return redirect(302, '/auth/login');
    }
};

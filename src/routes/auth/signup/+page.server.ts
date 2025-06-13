import type { Actions } from './$types';
import { checkEmailAvailability, createUser } from '$lib/server/api/user';
import { signupSchema } from '$features/auth/types/authSchema';
import type { ActionState } from '$lib/types';
import { fail } from '@sveltejs/kit';

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

        const user = await createUser(email, username, password);

        return {
            state: {
                success: true,
                message: 'Signup successful'
            }
        };
    }
};

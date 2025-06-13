import { z } from 'zod';
import type { ActionState } from '$lib/types';

export const signupSchema = z
    .object({
        username: z.string().min(3, { message: 'Username must be at least 3 characters' }).max(20, {
            message: 'Username must be less than 20 characters'
        }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(8, { message: 'At least 8 characters' })
            .regex(/[0-9]/, {
                message: 'Contains at least one number'
            })
            .regex(/[a-z]/, {
                message: 'Contains at least one lowercase letter'
            })
            .regex(/[A-Z]/, {
                message: 'Contains at least one uppercase letter'
            })
            .regex(/[!@#$%^&*]/, {
                message: 'Contains at least one special character'
            }),
        'confirm-password': z.string()
    })
    .refine((data) => data.password === data['confirm-password'], {
        message: 'Passwords do not match',
        path: ['confirm-password']
    });

export const loginSchema = z.object({
    
})

export type SignupActionState = ActionState<typeof signupSchema>;

export type SignupSchema = z.infer<typeof signupSchema>;

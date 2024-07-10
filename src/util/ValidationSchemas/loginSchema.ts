import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required.',
        })
        .min(3, {
            message: "Username must be at least 2 characters long.",
        })
        .max(250, {
            message: "Username must be less than 250 characters long.",
        }),
    password: z
        .string({
            required_error: 'Password is required.',
        })
        .min(5, {
            message: "Password must be at least 2 characters long.",
        })
        .max(250, {
            message: "Password must be less than 250 characters long.",
        }),
    id_system_subscription: z
        .string({
            required_error: 'Subscribed entity is required.'
        })
        .transform((val) => Number(val))
        .pipe(
            z
            .number({
                message: 'Subscribed entity is not a number',
                required_error: 'Subscribed entity is required.',
            })
            .int({
                message: 'Subscribed entity ID must be an integer number.'
            })
        )
});
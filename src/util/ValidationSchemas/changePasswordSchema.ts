import { z } from "zod";

const passwordRegexp = /(?=([a-z0-9A-Z]|[^a-z0-9A-Z])*\1)(?=([a-z0-9A-Z]|[^a-z0-9A-Z])*[A-Z])(?=([a-z0-9A-Z]|[^a-z0-9A-Z])*[a-z])(?=([a-z0-9A-Z]|[^a-z0-9A-Z])*[0-9])(?=([a-z0-9A-Z]|[^a-z0-9A-Z])*[^a-z0-9A-Z])/g,
    minimumMessage = "must be at least 8 characters long.",
    maximumMessage = "must be less than 31 characters long.",
    currentPasswordName = 'Current password',
    newPasswordName = 'New password',
    confirmNewPasswordName = 'Confirm new password';

export const changePasswordSchema = z.object({
    current_password: z
        .string()
        .min(3, {
            message: `${currentPasswordName} ${minimumMessage}`,
        })
        .max(30, {
            message: `${currentPasswordName} ${maximumMessage}`,
        }),
    new_password: z
        .string()
        .min(8, {
            message: `${newPasswordName} ${minimumMessage}`,
        })
        .max(30, {
            message: `${newPasswordName} ${maximumMessage}`,
        })
        .refine(pass => passwordRegexp.test(pass), {
            message: `The new password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.`
        }),
    confirm_new_password: z
        .string()
        .min(8, {
            message: `${confirmNewPasswordName} ${minimumMessage}`,
        })
        .max(30, {
            message: `${confirmNewPasswordName} ${maximumMessage}`,
        })
});
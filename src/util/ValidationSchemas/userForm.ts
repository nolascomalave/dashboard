import { z } from "zod";
import validator from 'validator';

export const MAX_FILE_SIZE = 10 * (1024 * 1024); // 10 MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const genders = {"Male": 'Male', 'Female': 'Female'};

export const userSchema = z.object({
    first_name: z
        .string()
        .min(2, {
            message: "First Name must be at least 2 characters long",
        })
        .max(200, {
            message: "First Name must be less than 200 characters long",
        }),
    second_name: z
        .string()
        .min(2, {
            message: "Second Name must be at least 2 characters long",
        })
        .max(200, {
            message: "Second Name must be less than 200 characters long",
        })
        .optional()
        .or(z.literal('')),
    first_surname: z
        .string()
        .min(2, {
            message: "First Surname be at least 2 characters long",
        })
        .max(200, {
            message: "First Surname must be less than 200 characters long",
        }),
    second_surname: z
        .string()
        .min(2, {
            message: "Second Surname must be at least 2 characters long",
        })
        .max(200, {
            message: "Second Surname must be less than 200 characters long",
        })
        .optional()
        .or(z.literal('')),
    gender: z.enum(Object.keys(genders), {
        errorMap: () => ({ message: "Please select a gender" }),
    }),
    ssn: z.string().regex(/^(\d+|\d+\-\d+\-\d+)$/),
    email: z.string().email({
        message: "Please enter a valid email",
    }),
    first_phone: z.string().refine(validator.isMobilePhone),
    second_phone: z
        .string()
        .refine(validator.isMobilePhone)
        .optional()
        .or(z.literal('')),
    address: z
        .string()
        .max(2500)
        .optional()
        .or(z.literal('')),
    photo: z
        .custom<File | null | undefined>()
        .refine((file) => !file || (!!file && file.size <= MAX_FILE_SIZE), {
          message: "The profile picture must be a maximum of 10MB.",
        })
        .refine((file) => (!file || ACCEPTED_IMAGE_TYPES.includes(file.type)), {
          message: "Only images are allowed to be sent.",
        })
        .optional()
        .or(z.literal(null))
        .or(z.literal(undefined))
    /* confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    weight: z.string().refine((weight) => !isNaN(parseFloat(weight)), {
        message: "Weight must be a number",
    }),
    dateOfBirth: z.string().refine(dob => new Date(dob).toString() !== "Invalid Date", {
        message: "Please enter a valid date of birth"
    }),
    plan: z.enum(plans, {
        errorMap: () => ({ message: "Please select a plan" }),
    }), */
})/* .required({
    first_name: true,
    first_surname: true,
    gender: true,
    ssn: true,
    first_phone: true,
    email: true,
}) */;
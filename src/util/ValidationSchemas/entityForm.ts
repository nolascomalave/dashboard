import { z } from "zod";
import validator from 'validator';

export const MAX_FILE_SIZE = 10 * (1024 * 1024); // 10 MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const genders = {"Male": 'Male', 'Female': 'Female'};

export const entitySchema = z.object({
    // Natural Person Fields:
    first_name: z
        .string()
        .min(2, {
            message: "First Name must be at least 2 characters long",
        })
        .max(200, {
            message: "First Name must be less than 200 characters long",
        })
        .optional()
        .or(z.literal('')),
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
        })
        .optional()
        .or(z.literal('')),
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
    gender: z
        .enum(['', ...Object.keys(genders)], {
            errorMap: () => ({ message: "Please select a gender" }),
        })
        .optional(),
    ssn: z
        .string().regex(/^(\d+|\d+\-\d+\-\d+)$/)
        .optional()
        .or(z.literal('')),
    // Legal Person Fields:
    business_name: z
        .string()
        .min(2, {
            message: "Business Name must be at least 2 characters long",
        })
        .max(250, {
            message: "Business Name must be less than 250 characters long",
        })
        .optional()
        .or(z.literal('')),
    comercial_designation: z
        .string()
        .min(2, {
            message: "Comercial Designation must be at least 5 characters long",
        })
        .max(250, {
            message: "Comercial Designation must be less than 250 characters long",
        })
        .optional()
        .or(z.literal('')),
    // Both People type fields:
    is_natural: z
        .boolean({
            required_error: "Please select a person type",
            invalid_type_error: "Please select a person type",
        }),
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
}).superRefine((values, context) => {
    if(values.is_natural === false) {
        if(!(values.business_name ?? '').trim()) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "The Business Name is required",
                path: ["business_name"],
            });
        }
    } else if(values.is_natural === true) {
        if(!(values.first_name ?? '').trim()) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "The First Name is required",
                path: ["first_name"],
            });
        }

        if(!(values.first_surname ?? '').trim()) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "The First Surname is required",
                path: ["first_surname"],
            });
        }

        if(!(values.gender ?? '').trim()) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "The gender is required",
                path: ["gender"],
            });
        }

        if(!(values.ssn ?? '').trim()) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: "The Social Security Number is required",
                path: ["ssn"],
            });
        }
    }
  });
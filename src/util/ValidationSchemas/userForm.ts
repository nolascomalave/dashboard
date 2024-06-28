import { z } from "zod";
import validator from 'validator';

export const genders = {"M": 'Male', 'F': 'Female'};

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
        }),
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
        }),
    gender: z.enum(Object.keys(genders), {
        errorMap: () => ({ message: "Please select a gender" }),
    }),
    ssn: z.string().regex(/^(\d+|\d+\-\d+\-\d+)$/),
    email: z.string().email({
        message: "Please enter a valid email",
    }),
    first_phone: z.string().refine(validator.isMobilePhone),
    second_phone: z.string().refine(validator.isMobilePhone),
    address: z.string().max(2500)
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
});
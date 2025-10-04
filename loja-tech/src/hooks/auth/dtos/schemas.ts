import { constValidation } from "@/share/utils/constSchemasvalidate"
import { z } from "zod"

export const validateSignIn = z.object({
    email: constValidation.email,
    password: constValidation.password
})

export type SignInFormData = z.infer<typeof validateSignIn>

export const validateSignUp = z.object({
    name: constValidation.name,
    email: constValidation.email,
    password: constValidation.password,
    confirmPassword: constValidation.password
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof validateSignUp>

export const validateForgotPassword = z.object({
    email: constValidation.email,
})

export type ForgotPasswordFormData = z.infer<typeof validateForgotPassword>

export const validateResetPassword = z.object({
    password: constValidation.password,
    confirmPassword: constValidation.password
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof validateResetPassword>
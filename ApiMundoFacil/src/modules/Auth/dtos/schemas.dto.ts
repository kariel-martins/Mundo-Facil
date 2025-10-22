import { z } from "zod";
import { constValidation } from "../../../share/utils/constsValidetions";
import { validation } from "../../../share/middleware/validations";

export const validateSignUpRequestedSchema = validation((getSchema) => ({
  body: getSchema(
    z
      .object({
        name: constValidation.name,
        email: constValidation.email,
        password: constValidation.password,
        confirmPassword: constValidation.password,
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confPassword"],
      })
  ),
}));

export const validateSignInRequestedSchema = validation((getSchema) => ({
  body: getSchema(
    z.object({
      email: constValidation.email,
      password: constValidation.password,
    })
  ),
}));

export const validateEmailRequestedSchema = validation((getSchema) => ({
  body: getSchema(
    z.object({
      email: constValidation.email,
    })
  ),
}));

export const validateEmailVerificationRequestedSchema = validation(
  (getSchema) => ({
    query: getSchema(
      z.object({
        user_id: z.string(),
        token: z.string(),
      })
    ),
  })
);

export const validateResetPasswordRequestedSchema = validation((getSchema) => ({
  body: getSchema(
    z
      .object({
        password: constValidation.password,
        confirmPassword: constValidation.password,
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confPassword"],
      })
  ),
  query: getSchema(
      z.object({
        token: z.string(),
      })
    ),
}));
export const validateByIdRequestedSchema = validation((getSchema) => ({
  params: getSchema(
      z.object({
        user_id: z.string(),
      })
    ),
}));

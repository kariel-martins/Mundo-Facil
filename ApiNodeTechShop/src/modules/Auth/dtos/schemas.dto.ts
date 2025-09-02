import { z } from "zod";
import { constValidation } from "../../../share/utils/constsValidetions";
import { validation } from "../../../share/middleware/validations";

export const validateSigUp = validation((getSchema)=>({
    body: getSchema(z.object({
        name: constValidation.name,
        email: constValidation.email,
        password: constValidation.password,
        confPassword: constValidation.password
      })
      .refine((data) => data.password === data.confPassword, {
        message: "As senhas não coincidem",
        path: ["confPassword"],
      }))
  }))


export const validateSignIn = {
  email: constValidation.email,
  password: constValidation.password,
};

export const validateEmail = {
  schema: {
    body: z.object({
      email: constValidation.email,
    }),
  },
};

export const EmailVerificationRequestedSchema = z.object({
  eventId: z.string().uuid(),
  occurredAt: z.string().datetime(),
  schemaVersion: z.literal(1),
  userId: z.string(),
  email: z.string().email(),
  token: z.string(),
  expiresAt: z.string().datetime(),
});
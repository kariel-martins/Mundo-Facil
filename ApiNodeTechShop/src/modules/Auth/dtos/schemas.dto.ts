import { regex, z } from "zod";

export const validateSigUp = {
  Schema: {
    body: z
      .object({
        name: z.string().min(3),
        email: z.string().regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/),
        password: z
          .string()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
        confPassword: z
          .string()
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
      })
      .refine((data) => data.password === data.confPassword, {
        message: "As senhas não coincidem",
        path: ["confPassword"],
      }),
  },
};

export const validateSignIn = {
  email: z.string().regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
};

export const validateEmail = {
  schema: {
    body: z.object({
      email: z.string().regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/),
    }),
  },
};

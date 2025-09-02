import { z } from "zod";

const name = z.string().min(3);
const email = z.string().regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/);
const password = z
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);

  export const constValidation = {
    name,
    email,
    password,
  }
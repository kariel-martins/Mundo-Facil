import { z } from "zod";

const name = z.string().min(3);
const email = z.string().regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/);
const password = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);
const number = z.coerce.number().min(1, "Esse campo é obrigatório")
const id = z.string()
const url = z.url()
const text = z.string()

  export const constValidation = {
    name,
    email,
    password,
    id,
    number,
    url,
    text,
  }
import { validation } from "../../../share/middleware/validations";
import { z } from "zod";
import { constValidation } from "../../../share/utils/constsValidetions";
export const validateCartSchemaCreate = validation((getSchema) => ({
  body: getSchema(
    z.object({
      user_id: constValidation.id,
      product_id: constValidation.id,
      quantity: constValidation.number,
    })
  ),
}));

export const validateCartSchema = validation((getSchema) => ({
  params: getSchema(
    z.object({
      user_id: constValidation.id,
    })
  ),
}));

export const validateCartSchemaById = validation((getSchema) => ({
  params: getSchema(
    z.object({
      cart_id: constValidation.id,
    })
  ),
}));

export const validateCartSchemaUpdate = validation((getSchema) => ({
  body: getSchema(
    z.object({
      quantity: constValidation.number,
    })
  ),
  params: getSchema(
    z.object({
      cart_id: constValidation.id,
    })
  ),
}));

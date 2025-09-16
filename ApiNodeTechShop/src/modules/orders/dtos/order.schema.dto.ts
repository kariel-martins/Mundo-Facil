import { validation } from "../../../share/middleware/validations";
import { z } from "zod";
import { constValidation } from "../../../share/utils/constsValidetions";
export const validateOrderSchemaCreate = validation((getSchema) => ({
  body: getSchema(
    z.object({
        quantity: constValidation.number,
        store_id: constValidation.id
    })
  ),
  params: getSchema(
    z.object({
      user_id: constValidation.id,
    })
  ),
  query: getSchema(
    z.object({
      product_id: constValidation.id,
    })
  )
}));

export const validateOrderSchemaById = validation((getSchema) => ({
  params: getSchema(
    z.object({
      order_id: constValidation.id,
    })
  ),
}));

export const validateOrderSchemaUpdate = validation((getSchema) => ({
  body: getSchema(
    z.object({
        quantity: constValidation.number.optional()
    })
  ),
  params: getSchema(
    z.object({
      order_id: constValidation.id,
    })
  )
}));

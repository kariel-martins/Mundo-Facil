import { validation } from "../../../share/middleware/validations";
import { z } from "zod";
import { constValidation } from "../../../share/utils/constsValidetions";
export const validateOrderSchemaCreate = validation((getSchema) => ({
  body: getSchema(
    z.object({
      quantity: constValidation.number,
      store_id: constValidation.id,
      user_id: constValidation.id,
      product_id: constValidation.id,
      status: constValidation.status,
    })
  ),
}));

export const validateOrderSchemaByIdUsers = validation((getSchema) => ({
  params: getSchema(
    z.object({
      user_id: constValidation.id,
    })
  ),
}));

export const validateOrderSchemaByIdOrders = validation((getSchema) => ({
  params: getSchema(
    z.object({
      order_id: constValidation.id,
    })
  ),
}));

export const validateOrderSchemaUpdate = validation((getSchema) => ({
  body: getSchema(
    z.object({
      quantity: constValidation.number.optional(),
    })
  ),
  params: getSchema(
    z.object({
      order_id: constValidation.id,
    })
  ),
}));

import { validation } from "../../../share/middleware/validations";
import { constValidation } from "../../../share/utils/constsValidetions";
import { z } from "zod";

export const validateProductSchemaCreate = validation((getSchema) => ({
  body: getSchema(
    z.object({
      productName: constValidation.name,
      price: constValidation.number,
      estoque: constValidation.number,
      image: constValidation.url,
    })
  ),
  params: getSchema(
    z.object({
      store_id: constValidation.id,
    })
  ),
}));
export const validateProductSchemaById = validation((getSchema) => ({
  params: getSchema(
    z.object({
      product_id: constValidation.id,
    })
  ),
}));
export const validateProductSchemaUpdate = validation((getSchema) => ({
  body: getSchema(
    z.object({
      productName: constValidation.name.optional(),
      price: constValidation.number.optional(),
      estoque: constValidation.number.optional(),
      image: constValidation.url.optional(),
    })
  ),
  params: getSchema(
    z.object({
      product_id: constValidation.id,
    })
  ),
}));

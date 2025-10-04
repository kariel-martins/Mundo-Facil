import { validation } from "../../../share/middleware/validations";
import { z } from "zod"
import { constValidation } from "../../../share/utils/constsValidetions";

export const validateStoreSchemaRegister = validation((getSchema)=> ({
    body: getSchema(z.object({
        storeName: constValidation.name,
        image: constValidation.url,
        email: constValidation.email
    })),
    params: getSchema(z.object({
       boss_id: constValidation.id
    }))
}))

export const validateStoreSchemaById = validation((getSchema)=> ({
    params: getSchema(z.object({
       store_id: constValidation.id
    }))
}))
export const validateStoreSchemaAll = validation((getSchema)=> ({
    params: getSchema(z.object({
       boss_id: constValidation.id
    }))
}))

export const validateStoreSchemaUpdate = validation((getSchema)=> ({
    body: getSchema(z.object({
        storeName: constValidation.name.optional(),
        image: constValidation.url.optional(),
        email: constValidation.email.optional()
    })),
    params: getSchema(z.object({
       store_id: constValidation.id
    }))
}))
import { validation } from "../../../share/middleware/validations";
import { z } from "zod"
import { constValidation } from "../../../share/utils/constsValidetions";

export const validateStoreRegister = validation((getSchema)=> ({
    body: getSchema(z.object({
        storeName: constValidation.name,
        image: constValidation.url,
        email: constValidation.email
    })),
    params: getSchema(z.object({
       boss_id: constValidation.id
    }))
}))

export const validateStoreById = validation((getSchema)=> ({
    params: getSchema(z.object({
       store_id: constValidation.id
    }))
}))
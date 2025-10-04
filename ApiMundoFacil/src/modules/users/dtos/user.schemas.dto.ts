import { validation } from "../../../share/middleware/validations";
import { z } from "zod"
import { constValidation } from "../../../share/utils/constsValidetions";

export const validateUserById = validation((getSchema)=> ({
    params: getSchema(
        z.object({
            user_id: z.string()
        })
    )
}))

export const validateUserUpdate = validation((getSchema)=> ({
    body: getSchema(
        z.object({
            productName: constValidation.name,
            price: constValidation.number,
            estoque: constValidation.number,
            image: constValidation.url
        })
    ),
    params: z.object({
        user_id: constValidation.id
    })
}))
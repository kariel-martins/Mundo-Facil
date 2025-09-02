"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validateSignIn = exports.validateSigUp = void 0;
const zod_1 = require("zod");
const constsValidetions_1 = require("../../../share/utils/constsValidetions");
const validations_1 = require("../../../share/middleware/validations");
exports.validateSigUp = (0, validations_1.validation)((getSchema) => ({
    body: getSchema(zod_1.z.object({
        name: constsValidetions_1.constValidation.name,
        email: constsValidetions_1.constValidation.email,
        password: constsValidetions_1.constValidation.password,
        confPassword: constsValidetions_1.constValidation.password
    })
        .refine((data) => data.password === data.confPassword, {
        message: "As senhas não coincidem",
        path: ["confPassword"],
    }))
}));
exports.validateSignIn = {
    email: constsValidetions_1.constValidation.email,
    password: constsValidetions_1.constValidation.password,
};
exports.validateEmail = {
    schema: {
        body: zod_1.z.object({
            email: constsValidetions_1.constValidation.email,
        }),
    },
};

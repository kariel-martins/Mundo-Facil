"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResetPasswordRequestedSchema = exports.validateEmailVerificationRequestedSchema = exports.validateEmailRequestedSchema = exports.validateSignInRequestedSchema = exports.validateSignUpRequestedSchema = void 0;
const zod_1 = require("zod");
const constsValidetions_1 = require("../../../share/utils/constsValidetions");
const validations_1 = require("../../../share/middleware/validations");
exports.validateSignUpRequestedSchema = (0, validations_1.validation)((getSchema) => ({
    body: getSchema(zod_1.z
        .object({
        name: constsValidetions_1.constValidation.name,
        email: constsValidetions_1.constValidation.email,
        password: constsValidetions_1.constValidation.password,
        confPassword: constsValidetions_1.constValidation.password,
    })
        .refine((data) => data.password === data.confPassword, {
        message: "As senhas não coincidem",
        path: ["confPassword"],
    })),
}));
exports.validateSignInRequestedSchema = (0, validations_1.validation)((getSchema) => ({
    body: getSchema(zod_1.z.object({
        email: constsValidetions_1.constValidation.email,
        password: constsValidetions_1.constValidation.password,
    })),
}));
exports.validateEmailRequestedSchema = (0, validations_1.validation)((getSchema) => ({
    body: getSchema(zod_1.z.object({
        email: constsValidetions_1.constValidation.email,
    })),
}));
exports.validateEmailVerificationRequestedSchema = (0, validations_1.validation)((getSchema) => ({
    query: getSchema(zod_1.z.object({
        userId: zod_1.z.string(),
        token: zod_1.z.string(),
    })),
}));
exports.validateResetPasswordRequestedSchema = (0, validations_1.validation)((getSchema) => ({
    body: getSchema(zod_1.z
        .object({
        name: constsValidetions_1.constValidation.name,
        email: constsValidetions_1.constValidation.email,
        password: constsValidetions_1.constValidation.password,
        confPassword: constsValidetions_1.constValidation.password,
    })
        .refine((data) => data.password === data.confPassword, {
        message: "As senhas não coincidem",
        path: ["confPassword"],
    })),
}));

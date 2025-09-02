"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (getAllSchemas) => (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult = {};
    Object.entries(schemas).forEach(([key, schema]) => {
        const result = schema.safeParse(req[key]);
        if (!result.success) {
            const errors = {};
            result.error.issues.forEach((error) => {
                if (!error.path.length)
                    return;
                const path = error.path.join(".");
                errors[path] = error.message;
            });
            errorsResult[key] = errors;
        }
    });
    if (Object.keys(errorsResult).length === 0) {
        next();
    }
    else {
        res.status(400).json({ errors: errorsResult });
    }
};
exports.validation = validation;

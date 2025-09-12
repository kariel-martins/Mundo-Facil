"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constValidation = void 0;
const zod_1 = require("zod");
const name = zod_1.z.string().min(3);
const email = zod_1.z.string().regex(/^[\w.-]+@[\w.-]+\.\w{2,}$/);
const password = zod_1.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/);
const number = zod_1.z.number();
const id = zod_1.z.string();
const url = zod_1.z.url();
exports.constValidation = {
    name,
    email,
    password,
    id,
    number,
    url,
};

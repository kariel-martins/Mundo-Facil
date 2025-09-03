"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordCrypto = void 0;
const bcryptjs_1 = require("bcryptjs");
const bcryptjs_2 = require("bcryptjs");
const SALT_RANDOMS = 8;
const hashText = async (password) => {
    const saltGenerated = await (0, bcryptjs_2.genSalt)(SALT_RANDOMS);
    return await (0, bcryptjs_1.hash)(password, saltGenerated);
};
const verifyText = async (password, hashPassword) => {
    return await (0, bcryptjs_1.compare)(password, hashPassword);
};
exports.passwordCrypto = {
    hashText,
    verifyText,
};

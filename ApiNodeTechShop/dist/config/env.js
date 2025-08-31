"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = env;
const AppErro_1 = require("../errors/AppErro");
function env() {
    const reqVars = ["PORT", "URL_DATABASE"];
    reqVars.forEach((key) => {
        if (!process.env[key])
            throw new AppErro_1.AppError(`Variavel de ambiente ${key}`, 500, "config/env.ts");
    });
    return {
        port: Number(process.env.PORT) || 3333,
        urlDatabase: process.env.URL_DATABASE,
    };
}

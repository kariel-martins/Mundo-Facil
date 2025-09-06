"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = env;
const AppErro_1 = require("../errors/AppErro");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function env() {
    const reqVars = ["PORT", "URL_DATABASE", "JWT_SECRET", "RABBITMQ_URL", "EMAIL_USER", "EMAIL_PASS", "FRONTEND_URL"];
    reqVars.forEach((key) => {
        if (!process.env[key])
            throw new AppErro_1.AppError(`Variavel de ambiente ${key}`, 500, "config/env.ts");
    });
    return {
        port: Number(process.env.PORT) || 3333,
        urlDatabase: process.env.URL_DATABASE,
        jwtSecret: process.env.JWT_SECRET,
        rabbitMQ: process.env.RABBITMQ_URL,
        emialUser: process.env.EMAIL_USER,
        emialPass: process.env.EMAIL_PASS,
        urlFrontEnd: process.env.FRONTEND_URL
    };
}

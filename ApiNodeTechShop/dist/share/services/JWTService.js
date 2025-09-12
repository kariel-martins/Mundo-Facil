"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const AppErro_1 = require("../../errors/AppErro");
const { jwtSecret } = (0, env_1.env)();
class JWTService {
    async signToken(uid, minutes) {
        try {
            const authToken = await this.sign({ scope: uid }, minutes);
            if (!authToken || authToken === "JWT_SECRET_NOT_FOUND") {
                throw new AppErro_1.AppError("Erro ao gerar o token", 400);
            }
            return authToken;
        }
        catch (error) {
            console.error("Erro em signToken:", error);
            throw new AppErro_1.AppError("Não foi possível gerar o token", 500, "auth/services/service.auth.ts/signToken");
        }
    }
    async verifyToken(token) {
        try {
            const authToken = await this.verify(token);
            if (!authToken ||
                (typeof authToken === "string" &&
                    [
                        "JWT_SECRET_NOT_FOUND",
                        "INVALID_TOKEN",
                        "ERRO_TOKEN_VERIFY",
                    ].includes(authToken))) {
                throw new AppErro_1.AppError("Token inválido", 400);
            }
            return authToken;
        }
        catch (error) {
            console.error("Erro em verifyToken:", error);
            throw new AppErro_1.AppError("Não foi possível verificar o token", 500, "auth/services/service.auth.ts/verifyToken");
        }
    }
    async sign(data, expireInMinutes = 15) {
        if (!jwtSecret)
            return "JWT_SECRET_NOT_FOUND";
        try {
            const result = await jwt.sign(data, jwtSecret, {
                expiresIn: `${expireInMinutes}m`,
            });
            return result;
        }
        catch {
            return "ERRO_TOKEN_SIGN";
        }
    }
    verify(token) {
        if (!jwtSecret)
            return "JWT_SECRET_NOT_FOUND";
        try {
            const decoded = jwt.verify(token, jwtSecret);
            if (typeof decoded === "string") {
                return "INVALID_TOKEN";
            }
            return decoded;
        }
        catch {
            return "ERRO_TOKEN_VERIFY";
        }
    }
}
exports.JWTService = JWTService;

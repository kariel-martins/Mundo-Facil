"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.AuthTokenService = void 0;
const AppErro_1 = require("../../../errors/AppErro");
const JWTService_1 = require("../../../share/services/JWTService");
const auth_repository_1 = require("../repositories/auth.repository");
class AuthTokenService {
    jwtService = new JWTService_1.JWTService();
    async signToken(uid, minutes) {
        try {
            const authToken = await this.jwtService.sign({ scope: uid }, minutes);
            if (!authToken || authToken === "JWT_SECRET_NOT_FOUND")
                throw new AppErro_1.AppError("Erro ao gera o token", 400);
            return authToken;
        }
        catch {
            throw new AppErro_1.AppError("Não foi possível gerar o token", 500, "auth/services/service.auth.ts/signToken");
        }
    }
    async verifyToken(token) {
        try {
            const authToken = await this.jwtService.verify(token);
            if (!authToken ||
                authToken === "JWT_SECRET_NOT_FOUND" ||
                authToken === "INVALID_TOKEN")
                throw new AppErro_1.AppError("Erro ao verificar o token", 400);
            return authToken;
        }
        catch {
            throw new AppErro_1.AppError("Não foi possível verificar o token", 500, "auth/services/service.auth.ts/verifyToken");
        }
    }
}
exports.AuthTokenService = AuthTokenService;
class AuthService {
    repo = new auth_repository_1.AuthRepository();
    async createUser(data) {
        try {
            const auth = await this.repo.create(data);
            if (!auth)
                throw new AppErro_1.AppError("Error ao criar o usuário", 400);
            return auth;
        }
        catch (err) {
            throw new AppErro_1.AppError("Não foi possíel criar o usuário", 500, "auth/services/service.auth.ts/createUser");
        }
    }
    async createTokenUser(token, minutes) {
        const now = new Date();
        const time = new Date(now.getTime() + minutes * 60 * 1000);
        if (!time)
            throw new AppErro_1.AppError("Erro ao gera a data", 500, "auth/services/service.auth.ts/createTokenUser");
        try {
            const auth = await this.repo.emailVerificationCreate(token, time);
            if (!auth)
                throw new AppErro_1.AppError("Error ao criar o token de verificação", 400);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Não foi possíel criar o token de verificação", 500, "auth/services/service.auth.ts/createTokenUser");
        }
    }
    async getByEmail(email) {
        try {
            const auth = await this.repo.findByEmail(email);
            if (!auth)
                throw new AppErro_1.AppError("Usuário não encontrado", 404);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Usuário não encontrado", 500, "auth/services/service.auth.ts/getByEmail");
        }
    }
    async getByIdTokenVerication(userId) {
        try {
            const auth = await this.repo.findTokenVerication(userId);
            if (!auth)
                throw new AppErro_1.AppError("Token não encontrado", 404);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Token não encontrado", 500, "auth/services/service.auth.ts/getByIdTokenVerication");
        }
    }
    async UpdatePasswordUser(email, password) {
        try {
            const auth = await this.repo.updatePassword(email, password);
            if (!auth)
                throw new AppErro_1.AppError("Error ao atualizar o usuário", 400);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Error ao atualizar a senha do usuário", 500, "auth/services/service.auth.ts/UpdatePasswordUser");
        }
    }
    async UpdateUser(email, email_verified_at, status) {
        try {
            const auth = await this.repo.updateUser(email, email_verified_at, status);
            if (!auth)
                throw new AppErro_1.AppError("Error ao atualizar o usuário", 400);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Error ao atualizar o usuário", 500, "auth/services/service.auth.ts/UpdatePasswordUser");
        }
    }
    async updateAutetication(userId, expiresAt, consumeAt) {
        try {
            const auth = await this.repo.updateAutetication(userId, expiresAt, consumeAt);
            if (!auth)
                throw new AppErro_1.AppError("Error ao atualizar o token de verificação", 400);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Error ao atualizar o token de verificação", 500, "auth/services/service.auth.ts/updateAutetication");
        }
    }
    async removeTokenUser(userId) {
        try {
            const auth = await this.repo.removeTokenUser(userId);
            if (!auth)
                throw new AppErro_1.AppError("Error ao remove o token de verificação", 400);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Error ao remove o token de verificação", 500, "auth/services/service.auth.ts/updateAutetication");
        }
    }
}
exports.AuthService = AuthService;

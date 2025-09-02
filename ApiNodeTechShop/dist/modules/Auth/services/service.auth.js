"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppErro_1 = require("../../../errors/AppErro");
const auth_repository_1 = require("../repositories/auth.repository");
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
    async createTokenUser(token) {
        try {
            const auth = await this.repo.emailVerificationCreate(token);
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

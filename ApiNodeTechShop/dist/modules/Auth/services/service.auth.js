"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.AuthTokenService = void 0;
const AppErro_1 = require("../../../errors/AppErro");
const auth_producers_1 = require("../../../messages/producers/auth.producers");
const CryptoService_1 = require("../../../share/services/CryptoService");
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
                authToken === "INVALID_TOKEN" ||
                authToken === "ERRO_TOKEN_VERIFY")
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
    tokenService = new AuthTokenService();
    Crypto = new CryptoService_1.CryptoService();
    async registerUser(data) {
        try {
            await this.getByEmail(data.email);
            throw new AppErro_1.AppError("Email já existe", 409);
        }
        catch {
            try {
                // criar o usuário
                const passwordHash = await this.Crypto.hashText(data.password);
                const auth = await this.repo.create({ ...data, passwordHash });
                if (!auth)
                    throw new AppErro_1.AppError("Error ao criar o usuário", 400);
                // cria o token de verificão
                const uid = auth.id;
                if (!uid)
                    throw new AppErro_1.AppError("Id Não encotrado!");
                const token = await this.tokenService.signToken(uid, 15);
                const tokenHash = await this.Crypto.hashText(token);
                const userToken = await this.createTokenUser(tokenHash, 15, uid);
                // Publicar eventos
                await (0, auth_producers_1.publishUserCreated)({
                    id: uid,
                    name: auth.name,
                    email: auth.email,
                });
                await (0, auth_producers_1.publishEmailVerificationRequested)({
                    userId: uid,
                    email: auth.email,
                    token: token,
                    expiresAt: userToken.expires_at.toISOString(),
                });
                return auth;
            }
            catch (err) {
                throw new AppErro_1.AppError("Não foi possíel criar o usuário", 500, "auth/services/service.auth.ts/createUser");
            }
        }
    }
    async createTokenUser(token, minutes, user_Id) {
        const now = new Date();
        const time = new Date(now.getTime() + minutes * 60 * 1000);
        if (!time)
            throw new AppErro_1.AppError("Erro ao gera a data", 500, "auth/services/service.auth.ts/createTokenUser");
        try {
            const auth = await this.repo.emailVerificationCreate(token, time, user_Id);
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
    async getByIdTokenVerication(user_id, token) {
        const tokenHash = await this.repo.findByIdTokenVerication(user_id);
        if (!tokenHash)
            throw new AppErro_1.AppError("Usuário não encotrado", 404);
        const tokenVericate = await this.Crypto.verifyText(token, tokenHash.tokenHash);
        console.log(tokenHash.tokenHash, "foi", token);
        if (!tokenVericate)
            throw new AppErro_1.AppError("Token inválido", 404);
        const auth = await this.repo.findByIdTokenVerication(user_id);
        if (!auth)
            throw new AppErro_1.AppError("Token não encontrado", 404);
        return auth;
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
            const auth = await this.repo.updateAutenticationUser(email, email_verified_at, status);
            if (!auth)
                throw new AppErro_1.AppError("Error ao atualizar o usuário", 400);
            return auth;
        }
        catch {
            throw new AppErro_1.AppError("Error ao atualizar o usuário", 500, "auth/services/service.auth.ts/UpdatePasswordUser");
        }
    }
    async updateAutetication(user_id) {
        try {
            const verifyTokenUpdate = await this.repo.updateAuteticationToken(user_id);
            if (!verifyTokenUpdate)
                throw new AppErro_1.AppError("Error ao atualizar o token de verificação", 400);
            const updatedUser = await this.repo.updateAutenticationUser(user_id, new Date(), "ativo");
            if (!updatedUser)
                throw new AppErro_1.AppError("Error ao atualizar a autorização de usuário");
            return updatedUser;
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

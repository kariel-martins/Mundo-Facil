"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AppErro_1 = require("../../../errors/AppErro");
const auth_producers_1 = require("../../../messages/producers/auth.producers");
const CryptoService_1 = require("../../../share/services/CryptoService");
const JWTService_1 = require("../../../share/services/JWTService");
const auth_repository_1 = require("../repositories/auth.repository");
class AuthService {
    repo = new auth_repository_1.AuthRepository();
    tokenService = new JWTService_1.JWTService();
    crypto = new CryptoService_1.CryptoService();
    // helper para padronizar tratamento de erros
    async execute(fn, message, context) {
        try {
            return await fn();
        }
        catch (error) {
            console.error(`Erro em ${context}:`, error);
            if (error instanceof AppErro_1.AppError)
                throw error;
            throw new AppErro_1.AppError(message, 500, context);
        }
    }
    async registerUser(data) {
        return this.execute(async () => {
            // impede duplicidade
            try {
                const existing = await this.repo.findByEmail(data.email, "ativo");
                if (existing)
                    throw new AppErro_1.AppError("Email já existe", 409);
            }
            catch { }
            // cria usuário
            const passwordHash = await this.crypto.hashText(data.password);
            const auth = await this.repo.create({ ...data, passwordHash });
            if (!auth)
                throw new AppErro_1.AppError("Erro ao criar o usuário", 400);
            // cria token de verificação
            const uid = auth.id;
            if (!uid)
                throw new AppErro_1.AppError("Id não encontrado");
            const token = await this.tokenService.signToken(uid, 15);
            const tokenHash = await this.crypto.hashText(token);
            const userToken = await this.createTokenUser(tokenHash, 15, uid);
            // publica eventos
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
            // retorna user seguro
            const { passwordHash: _, ...safeUser } = auth;
            return safeUser;
        }, "Não foi possível criar o usuário", "auth/services/service.auth.ts/registerUser");
    }
    async getUser(email, password) {
        return this.execute(async () => {
            const user = await this.getByEmail(email, "ativo");
            if (!user)
                throw new AppErro_1.AppError("Usuário não encontrado", 404);
            const validPassword = await this.crypto.verifyText(password, user.passwordHash);
            if (!validPassword)
                throw new AppErro_1.AppError("Usuário ou senha inválidos", 401);
            const { passwordHash: _, ...safeUser } = user;
            return safeUser;
        }, "Erro ao buscar usuário", "auth/services/service.auth.ts/getUser");
    }
    async forgotPassword(email) {
        return this.execute(async () => {
            const user = await this.getByEmail(email, "ativo");
            if (!user || !user.id)
                throw new AppErro_1.AppError("Usuário ou Id não encontrado", 404);
            const token = await this.tokenService.signToken(user.email, 15);
            const tokenHash = await this.crypto.hashText(token);
            await this.createTokenUser(tokenHash, 15, user.id);
            await (0, auth_producers_1.publishForgotPasswordEmail)(user.email, token, user.name);
            return { message: "E-mail de recuperação enviado com sucesso" };
        }, "Erro ao processar recuperação de senha", "auth/services/service.auth.ts/forgotPassword");
    }
    async verifyAuthentication(user_id, token) {
        return this.execute(async () => {
            const verification = await this.getByIdTokenVerification(user_id, token);
            if (!verification)
                throw new AppErro_1.AppError("Verificação não encontrada ou já usada", 404);
            if (new Date() > verification.expires_at)
                throw new AppErro_1.AppError("Token expirado", 400);
            const uid = verification.user_id;
            if (!uid)
                throw new AppErro_1.AppError("Usuário não encontrado", 404);
            return await this.updateAuthentication(uid);
        }, "Erro ao verificar autenticação", "auth/services/service.auth.ts/verifyAuthentication");
    }
    async resetPassword(token, password) {
        return this.execute(async () => {
            const payload = await this.tokenService.verifyToken(token);
            if (!payload ||
                payload === "INVALID_TOKEN" ||
                payload === "JWT_SECRET_NOT_FOUND" ||
                payload === "ERRO_TOKEN_VERIFY")
                throw new AppErro_1.AppError("Token inválido", 404, "services/resetPassword");
            const user = await this.getByEmail(payload.scope, "ativo");
            if (!user)
                throw new AppErro_1.AppError("Email não encontrado", 404, "services/resetPassword");
            const passwordHash = await this.crypto.hashText(password);
            const updated = await this.updatePasswordUser(user.email, passwordHash);
            await (0, auth_producers_1.publishResertPasswordUser)(updated.email, updated.name);
            return { message: "Senha atualizada com sucesso" };
        }, "Erro ao processar resetPassword", "auth/services/service.auth.ts/resetPassword");
    }
    async createTokenUser(token, minutes, user_Id) {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + minutes * 60 * 1000);
        if (!expiresAt)
            throw new AppErro_1.AppError("Erro ao gerar a data de expiração", 500);
        return this.execute(() => this.repo.emailVerificationCreate(token, expiresAt, user_Id), "Não foi possível criar o token de verificação", "auth/services/service.auth.ts/createTokenUser");
    }
    async getByEmail(email, status) {
        return this.execute(() => this.repo.findByEmail(email, status), "Usuário não encontrado", "auth/services/service.auth.ts/getByEmail");
    }
    async getByIdTokenVerification(user_id, token) {
        return this.execute(async () => {
            const tokenHash = await this.repo.findByIdTokenVerification(user_id);
            if (!tokenHash)
                throw new AppErro_1.AppError("Usuário não encontrado", 404);
            const isValid = await this.crypto.verifyText(token, tokenHash.tokenHash);
            if (!isValid)
                throw new AppErro_1.AppError("Token inválido", 404);
            return tokenHash;
        }, "Erro ao verificar token", "auth/services/service.auth.ts/getByIdTokenVerification");
    }
    async updateAuthentication(user_id) {
        return this.execute(async () => {
            const tokenUpdated = await this.repo.updateAuthenticationToken(user_id);
            if (!tokenUpdated)
                throw new AppErro_1.AppError("Erro ao atualizar o token de verificação", 400);
            const updatedUser = await this.repo.updateAuthenticationUser(user_id, new Date(), "ativo");
            if (!updatedUser)
                throw new AppErro_1.AppError("Erro ao atualizar autenticação de usuário", 400);
            return updatedUser;
        }, "Erro ao atualizar autenticação", "auth/services/service.auth.ts/updateAuthentication");
    }
    async updatePasswordUser(email, passwordHash) {
        return this.execute(() => this.repo.updatePassword(email, passwordHash), "Erro ao atualizar a senha", "auth/services/service.auth.ts/updatePasswordUser");
    }
}
exports.AuthService = AuthService;

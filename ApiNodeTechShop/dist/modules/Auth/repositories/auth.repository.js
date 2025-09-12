"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const client_database_1 = require("../../../database/client.database");
const schema_database_1 = require("../../../database/schema.database");
const AppErro_1 = require("../../../errors/AppErro");
class AuthRepository {
    // helper para centralizar erros
    async execute(fn, message, context) {
        try {
            const result = await fn();
            if (!result) {
                throw new AppErro_1.AppError(message, 404, context);
            }
            return result;
        }
        catch (error) {
            console.error(`Erro em ${context}:`, error?.message, error?.stack);
            if (error instanceof AppErro_1.AppError)
                throw error;
            throw new AppErro_1.AppError(message, 500, context);
        }
    }
    async create(data) {
        return this.execute(async () => {
            const result = await client_database_1.db.insert(schema_database_1.users).values(data).returning();
            return result[0];
        }, "Erro ao criar o usuário", "auth/repositories/auth.repository.ts/create");
    }
    async emailVerificationCreate(tokenHash, expires_at, user_id) {
        return this.execute(async () => {
            const result = await client_database_1.db
                .insert(schema_database_1.email_verifications)
                .values({ tokenHash, expires_at, user_id })
                .returning();
            return result[0];
        }, "Erro ao criar token de verificação", "auth/repositories/auth.repository.ts/emailVerificationCreate");
    }
    async findByEmail(email, status) {
        return this.execute(async () => {
            const result = await client_database_1.db
                .select()
                .from(schema_database_1.users)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_database_1.users.email, email), (0, drizzle_orm_1.eq)(schema_database_1.users.status, status)));
            return result[0];
        }, "Usuário não encontrado", "auth/repositories/auth.repository.ts/findByEmail");
    }
    async findByIdTokenVerification(user_id) {
        return this.execute(async () => {
            const result = await client_database_1.db
                .select()
                .from(schema_database_1.email_verifications)
                .where((0, drizzle_orm_1.eq)(schema_database_1.email_verifications.user_id, user_id));
            return result[0];
        }, "Token de verificação não encontrado", "auth/repositories/auth.repository.ts/findByIdTokenVerification");
    }
    async updatePassword(email, passwordHash) {
        return this.execute(async () => {
            const result = await client_database_1.db
                .update(schema_database_1.users)
                .set({ passwordHash })
                .where((0, drizzle_orm_1.eq)(schema_database_1.users.email, email))
                .returning();
            return result[0];
        }, "Erro ao atualizar senha do usuário", "auth/repositories/auth.repository.ts/updatePassword");
    }
    async updateAuthenticationUser(user_id, email_verified_at, status) {
        return this.execute(async () => {
            const result = await client_database_1.db
                .update(schema_database_1.users)
                .set({ email_verified_at, status })
                .where((0, drizzle_orm_1.eq)(schema_database_1.users.id, user_id))
                .returning();
            return result[0];
        }, "Erro ao atualizar autenticação do usuário", "auth/repositories/auth.repository.ts/updateAuthenticationUser");
    }
    async updateAuthenticationToken(user_id) {
        return this.execute(async () => {
            const result = await client_database_1.db
                .update(schema_database_1.email_verifications)
                .set({ consumed_at: new Date() })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_database_1.email_verifications.user_id, user_id), (0, drizzle_orm_1.isNull)(schema_database_1.email_verifications.consumed_at)))
                .returning();
            return result[0];
        }, "Erro ao atualizar token de autenticação", "auth/repositories/auth.repository.ts/updateAuthenticationToken");
    }
    async removeTokenUser(userId) {
        return this.execute(async () => {
            const result = await client_database_1.db
                .delete(schema_database_1.email_verifications)
                .where((0, drizzle_orm_1.eq)(schema_database_1.email_verifications.user_id, userId))
                .returning();
            return result[0];
        }, "Erro ao remover token de verificação", "auth/repositories/auth.repository.ts/removeTokenUser");
    }
}
exports.AuthRepository = AuthRepository;

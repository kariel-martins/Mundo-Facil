"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const client_database_1 = require("../../../database/client.database");
const schema_database_1 = require("../../../database/schema.database");
const AppErro_1 = require("../../../errors/AppErro");
class AuthRepository {
    async create(data) {
        try {
            const auth = await client_database_1.db.insert(schema_database_1.users).values(data).returning();
            return auth[0] ?? null;
        }
        catch (err) {
            console.error(err);
            throw new AppErro_1.AppError("Error ao criar o usuáiro", 500, "aut/repositeries/auth.repository.ts/create");
        }
    }
    async emailVerificationCreate(data) {
        try {
            const auth = await client_database_1.db.insert(schema_database_1.emailVerifications).values(data).returning();
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao criar token de verificação", 500, "aut/repositeries/auth.repository.ts/emailVerificationCreate");
        }
    }
    async findByEmail(email) {
        try {
            const auth = await client_database_1.db.select().from(schema_database_1.users).where((0, drizzle_orm_1.eq)(schema_database_1.users.email, email));
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao busca o usuário", 500, "aut/repositeries/auth.repository.ts/findByEmail");
        }
    }
    async findTokenVerication(userId) {
        try {
            const auth = await client_database_1.db
                .select()
                .from(schema_database_1.emailVerifications)
                .where((0, drizzle_orm_1.eq)(schema_database_1.emailVerifications.userId, userId));
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao busca o token de verificação", 500, "aut/repositeries/auth.repository.ts/findTokenVerication");
        }
    }
    async updatePassword(email, passwordHash) {
        try {
            const auth = await client_database_1.db
                .update(schema_database_1.users)
                .set({ passwordHash })
                .where((0, drizzle_orm_1.eq)(schema_database_1.users.email, email))
                .returning();
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao atualizar a senha do usuário", 500, "auth/auth.repositories.ts/updatePassword");
        }
    }
    async updateUser(email, email_verified_at, status) {
        try {
            const auth = await client_database_1.db
                .update(schema_database_1.users)
                .set({ email_verified_at, status })
                .where((0, drizzle_orm_1.eq)(schema_database_1.users.email, email))
                .returning();
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao autalizar o usuário", 500, "auth/auth.repositories.ts/updatePassword");
        }
    }
    async updateAutetication(userId, expiresAt, consumeAt) {
        try {
            const auth = await client_database_1.db
                .update(schema_database_1.emailVerifications)
                .set({ expiresAt, consumeAt })
                .where((0, drizzle_orm_1.eq)(schema_database_1.emailVerifications.userId, userId))
                .returning();
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao autalizar o usuário", 500, "auth/auth.repositories.ts/updatePassword");
        }
    }
    async removeTokenUser(userId) {
        try {
            const auth = await client_database_1.db
                .delete(schema_database_1.emailVerifications)
                .where((0, drizzle_orm_1.eq)(schema_database_1.emailVerifications.userId, userId))
                .returning();
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Erro ao remove token de verificação", 500, "auth/auth.repositories.ts/removeTokenUser");
        }
    }
}
exports.AuthRepository = AuthRepository;

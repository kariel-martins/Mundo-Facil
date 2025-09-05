"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const client_database_1 = require("../../../database/client.database");
const schema_database_1 = require("../../../database/schema.database");
const AppErro_1 = require("../../../errors/AppErro");
const crypto_1 = __importDefault(require("crypto"));
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
    async emailVerificationCreate(token, time, user_id) {
        try {
            const tokenHash = crypto_1.default.createHash("sha256").update(token).digest("hex");
            const auth = await client_database_1.db.insert(schema_database_1.email_verifications).values({ tokenHash, expires_at: time, user_id }).returning();
            return auth[0] ?? null;
        }
        catch (err) {
            console.error("Erro ao salvar token:", err.message, err.stack);
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
                .from(schema_database_1.email_verifications)
                .where((0, drizzle_orm_1.eq)(schema_database_1.email_verifications.user_id, userId));
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
    async updateAutetication(userId, expires_at, consumed_at) {
        try {
            const auth = await client_database_1.db
                .update(schema_database_1.email_verifications)
                .set({ expires_at, consumed_at })
                .where((0, drizzle_orm_1.eq)(schema_database_1.email_verifications.user_id, userId))
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
                .delete(schema_database_1.email_verifications)
                .where((0, drizzle_orm_1.eq)(schema_database_1.email_verifications.user_id, userId))
                .returning();
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Erro ao remove token de verificação", 500, "auth/auth.repositories.ts/removeTokenUser");
        }
    }
}
exports.AuthRepository = AuthRepository;

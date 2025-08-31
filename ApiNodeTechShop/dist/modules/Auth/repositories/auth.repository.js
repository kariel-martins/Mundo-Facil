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
            throw new AppErro_1.AppError("Error ao criar o usuáiro", 500, "aut/repositeries/auth.repository.ts");
        }
    }
    async findByEmail(email) {
        try {
            const auth = await client_database_1.db.select().from(schema_database_1.users).where((0, drizzle_orm_1.eq)(schema_database_1.users.email, email));
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao busca o usuário", 500, "");
        }
    }
    async updatePassword(email, password) {
        try {
            const auth = await client_database_1.db.update(schema_database_1.users).set({ password }).where((0, drizzle_orm_1.eq)(schema_database_1.users.email, email)).returning();
            return auth[0] ?? null;
        }
        catch {
            throw new AppErro_1.AppError("Error ao autalizar o usuário", 500, "auth/repositories/updatePassword.ts");
        }
    }
}
exports.AuthRepository = AuthRepository;

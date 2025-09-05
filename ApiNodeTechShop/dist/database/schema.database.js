"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.carts = exports.products = exports.email_verifications = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)().primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.text)().notNull(),
    email: (0, pg_core_1.text)().unique().notNull(),
    passwordHash: (0, pg_core_1.text)().notNull(),
    email_verified_at: (0, pg_core_1.timestamp)("email_verified_at", { withTimezone: true }),
    status: (0, pg_core_1.varchar)("status", { length: 20 }).notNull().default("pending"),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.email_verifications = (0, pg_core_1.pgTable)("email_verifications", {
    id: (0, pg_core_1.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_1.uuid)("user_id").references(() => exports.users.id, { onDelete: "cascade" }),
    tokenHash: (0, pg_core_1.text)().notNull(),
    expires_at: (0, pg_core_1.timestamp)("expires_at", { withTimezone: true }).notNull(),
    consumed_at: (0, pg_core_1.timestamp)("consumed_at", { withTimezone: true }),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.products = (0, pg_core_1.pgTable)("products", {
    id: (0, pg_core_1.uuid)().primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.text)().notNull(),
    estoque: (0, pg_core_1.integer)().notNull().default(0),
    image: (0, pg_core_1.text)().notNull(),
    price: (0, pg_core_1.integer)().default(0),
});
exports.carts = (0, pg_core_1.pgTable)("carts", {
    id: (0, pg_core_1.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_1.uuid)("user_id").references(() => exports.users.id, { onDelete: "cascade" }),
    product_id: (0, pg_core_1.uuid)("product_id")
        .notNull()
        .references(() => exports.products.id),
    quantity: (0, pg_core_1.integer)().notNull().default(0),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.orders = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_1.uuid)("user_id").references(() => exports.users.id, { onDelete: "cascade" }),
    product_id: (0, pg_core_1.uuid)("product_id")
        .notNull()
        .references(() => exports.products.id),
    quantity: (0, pg_core_1.integer)().notNull().default(0),
    created_at: (0, pg_core_1.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});

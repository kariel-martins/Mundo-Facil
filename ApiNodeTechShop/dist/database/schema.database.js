"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.carts = exports.products = exports.emailVerifications = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const pg_core_4 = require("drizzle-orm/pg-core");
const pg_core_5 = require("drizzle-orm/pg-core");
const pg_core_6 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_6.pgTable)("users", {
    id: (0, pg_core_5.uuid)().primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.text)().notNull(),
    email: (0, pg_core_1.text)().unique().notNull(),
    passwordHash: (0, pg_core_1.text)().notNull(),
    email_verified_at: (0, pg_core_2.timestamp)("email_verified_at", { withTimezone: true }),
    status: (0, pg_core_3.varchar)("status", { length: 20 }).notNull().default("pending"),
    createdAt: (0, pg_core_2.timestamp)("created_at", { withTimezone: true }).notNull().default((0, drizzle_orm_1.sql) `NOW()`)
});
exports.emailVerifications = (0, pg_core_6.pgTable)("email_verifications", {
    id: (0, pg_core_5.uuid)().primaryKey().notNull().defaultRandom(),
    userId: (0, pg_core_5.uuid)("user_id").references(() => exports.users.id, { onDelete: "cascade" }),
    tokenHash: (0, pg_core_1.text)().notNull(),
    expiresAt: (0, pg_core_2.timestamp)("exipres_At", { withTimezone: true }).notNull(),
    consumeAt: (0, pg_core_2.timestamp)("consumer_At", { withTimezone: true }),
    createdAt: (0, pg_core_2.timestamp)("created_at", { withTimezone: true }).notNull().default((0, drizzle_orm_1.sql) `NOW()`)
});
exports.products = (0, pg_core_6.pgTable)("products", {
    id: (0, pg_core_5.uuid)().primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.text)().notNull(),
    estoque: (0, pg_core_4.integer)().notNull().default(0),
    image: (0, pg_core_1.text)().notNull(),
    price: (0, pg_core_4.integer)().default(0),
});
exports.carts = (0, pg_core_6.pgTable)("carts", {
    id: (0, pg_core_5.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_5.uuid)("user_id")
        .notNull()
        .references(() => exports.users.id),
    product_id: (0, pg_core_5.uuid)("product_id")
        .notNull()
        .references(() => exports.products.id),
    quantity: (0, pg_core_4.integer)().notNull().default(0),
    datatime: (0, pg_core_2.timestamp)().defaultNow(),
});
exports.orders = (0, pg_core_6.pgTable)("orders", {
    id: (0, pg_core_5.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_5.uuid)("user_id")
        .notNull()
        .references(() => exports.users.id),
    product_id: (0, pg_core_5.uuid)("product_id")
        .notNull()
        .references(() => exports.products.id),
    quantity: (0, pg_core_4.integer)().notNull().default(0),
    datatime: (0, pg_core_2.timestamp)().defaultNow(),
});

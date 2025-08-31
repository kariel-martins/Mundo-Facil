"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.carts = exports.products = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const pg_core_4 = require("drizzle-orm/pg-core");
const pg_core_5 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_5.pgTable)("users", {
    id: (0, pg_core_4.uuid)().primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.text)().notNull(),
    email: (0, pg_core_1.text)().unique().notNull(),
    password: (0, pg_core_1.text)().notNull(),
});
exports.products = (0, pg_core_5.pgTable)("products", {
    id: (0, pg_core_4.uuid)().primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_1.text)().notNull(),
    estoque: (0, pg_core_3.integer)().notNull().default(0),
    image: (0, pg_core_1.text)().notNull(),
    price: (0, pg_core_3.integer)().default(0),
});
exports.carts = (0, pg_core_5.pgTable)("carts", {
    id: (0, pg_core_4.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_4.uuid)()
        .notNull()
        .references(() => exports.users.id),
    product_id: (0, pg_core_4.uuid)()
        .notNull()
        .references(() => exports.products.id),
    quantity: (0, pg_core_3.integer)().notNull().default(0),
    datatime: (0, pg_core_2.timestamp)().defaultNow(),
});
exports.orders = (0, pg_core_5.pgTable)("orders", {
    id: (0, pg_core_4.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_4.uuid)()
        .notNull()
        .references(() => exports.users.id),
    product_id: (0, pg_core_4.uuid)()
        .notNull()
        .references(() => exports.products.id),
    quantity: (0, pg_core_3.integer)().notNull().default(0),
    datatime: (0, pg_core_2.timestamp)().defaultNow(),
});

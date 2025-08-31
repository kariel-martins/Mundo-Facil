"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const env_1 = require("../config/env");
const AppErro_1 = require("../errors/AppErro");
const { urlDatabase } = (0, env_1.env)();
if (!urlDatabase)
    throw new AppErro_1.AppError("urlDatabase não encontrada", 500, "database/client.database.ts");
exports.db = (0, node_postgres_1.drizzle)(urlDatabase);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = require("./app");
const dataEnv = (0, env_1.env)();
app_1.app.listen(dataEnv.port, () => {
    console.log("servido rodando!!!");
});

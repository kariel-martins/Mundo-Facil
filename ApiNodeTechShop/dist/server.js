"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = require("./app");
const auth_consumers_1 = require("./messages/consumers/auth.consumers");
const store_consumers_1 = require("./messages/consumers/store.consumers");
const dataEnv = (0, env_1.env)();
async function bootstrap() {
    await (0, auth_consumers_1.startEmailVerificationConsumer)();
    await (0, auth_consumers_1.startForgotPasswordConsumer)();
    await (0, auth_consumers_1.startResertPasswordConsumer)();
    await (0, store_consumers_1.startCreateStoreRequest)();
    await app_1.app.listen(dataEnv.port, () => {
        console.log("servido rodando!!!");
    });
}
bootstrap();

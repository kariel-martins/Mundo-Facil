"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishUserCreated = publishUserCreated;
exports.publishEmailVerificationRequested = publishEmailVerificationRequested;
exports.publishForgotPasswordEmail = publishForgotPasswordEmail;
exports.publishResertPasswordUser = publishResertPasswordUser;
// messages/producers/auth.producers.ts
const node_crypto_1 = __importDefault(require("node:crypto"));
const rabbitmq_1 = require("../rabbitmq");
const EXCHANGE = "auth.events";
async function publishUserCreated(user) {
    const event = {
        eventId: node_crypto_1.default.randomUUID(),
        occurredAt: new Date().toISOString(),
        schemaVersion: 1,
        user,
    };
    await (0, rabbitmq_1.publish)(EXCHANGE, "auth.user.created", event, {
        headers: { "x-service": "auth" },
    });
    console.log("📨 Evento publicado: auth.user.created", event);
}
async function publishEmailVerificationRequested(data) {
    const event = {
        eventId: node_crypto_1.default.randomUUID(),
        occurredAt: new Date().toISOString(),
        schemaVersion: 1,
        ...data,
    };
    await (0, rabbitmq_1.publish)(EXCHANGE, "auth.email.verification.requested", event, {
        headers: { "x-service": "auth" },
    });
    console.log("📨 Evento publicado: auth.email.verification.requested", event);
}
async function publishForgotPasswordEmail(email, token, name) {
    const event = {
        email,
        token,
        name,
    };
    await (0, rabbitmq_1.publish)(EXCHANGE, "auth.forgot.password.requested", event, { headers: { "x-service": "auth" } });
    console.log("📨 Evento publicado: auth.forgot.password.requested", event, {
        headers: { "x-service": "auth" },
    });
}
async function publishResertPasswordUser(email, name) {
    const event = {
        email,
        name,
    };
    await (0, rabbitmq_1.publish)(EXCHANGE, "auth.resert.password.requested", event, {
        headers: { "x-service": "auth" },
    });
    console.log("📨  Evento publicado: auth.resert.password.requested", event);
}

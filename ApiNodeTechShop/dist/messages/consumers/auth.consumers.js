"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmailVerificationConsumer = startEmailVerificationConsumer;
exports.startForgotPasswordConsumer = startForgotPasswordConsumer;
exports.startResertPasswordConsumer = startResertPasswordConsumer;
// auth.consumers.ts - MODIFICAR
const EmailService_1 = require("../../share/services/EmailService");
const Email_auth_1 = require("../../share/templetes/Email.auth");
const rabbitmq_1 = require("../rabbitmq");
const EXCHANGE = "auth.events";
const DLX = "auth.events.dlx";
//============== Verify Email ================
const EMAIL_VERIFICATION_QUEUE = "email.verification.send";
const EMAIL_VERIFICATION_PATTERN = "auth.email.verification.requested";
async function startEmailVerificationConsumer() {
    try {
        // ✅ 1. Primeiro garantir que o exchange principal existe
        await (0, rabbitmq_1.assertTopicExchange)(EXCHANGE);
        // ✅ 2. Configurar queue com DLQ
        const ch = await (0, rabbitmq_1.assertQueueWithDLQ)(EMAIL_VERIFICATION_QUEUE, DLX);
        // ✅ 3. Agora fazer binding (a função bindQueue já declara o exchange)
        await (0, rabbitmq_1.bindQueue)(EMAIL_VERIFICATION_QUEUE, EXCHANGE, EMAIL_VERIFICATION_PATTERN);
        await ch.prefetch(10);
        console.log(`👂 Aguardando mensagens em: ${EMAIL_VERIFICATION_QUEUE} (pattern: ${EMAIL_VERIFICATION_PATTERN})`);
        ch.consume(EMAIL_VERIFICATION_QUEUE, async (msg) => {
            if (!msg)
                return;
            try {
                const event = JSON.parse(msg.content.toString());
                if (!event.email || !event.token || !event.userId) {
                    throw new Error("Dados do evento incompletos");
                }
                await (0, EmailService_1.sendEmail)(event.email, "Create Account", (0, Email_auth_1.createContaEmailTemplate)("auth/verify-email", event.token, event.userId));
                ch.ack(msg);
                console.log("✅ E-mail de verificação enviado:", event.email);
            }
            catch (err) {
                console.error("❌ Falha ao processar:", err);
                ch.ack(msg, false);
            }
        });
    }
    catch (error) {
        console.error("❌ Falha ao iniciar consumer:", error);
        throw error;
    }
}
//================ Forgort Password ==================
const FORGOT_PASSWORD_QUEUE = "email.forgot.password.send";
const FORGOT_PASSWORD_PATTERN = "auth.forgot.password.requested";
async function startForgotPasswordConsumer() {
    try {
        await (0, rabbitmq_1.assertTopicExchange)(EXCHANGE);
        const ch = await (0, rabbitmq_1.assertQueueWithDLQ)(FORGOT_PASSWORD_QUEUE, DLX);
        await (0, rabbitmq_1.bindQueue)(FORGOT_PASSWORD_QUEUE, EXCHANGE, FORGOT_PASSWORD_PATTERN);
        await ch.prefetch(10);
        console.log(`👂 Aguardando mensagens em: ${FORGOT_PASSWORD_QUEUE}`);
        ch.consume(FORGOT_PASSWORD_QUEUE, async (msg) => {
            if (!msg)
                return;
            try {
                const event = JSON.parse(msg.content.toString());
                if (!event.email || !event.token)
                    throw new Error("Dados de evento incompletos");
                await (0, EmailService_1.sendEmail)(event.email, "Forgot Password", (0, Email_auth_1.resetPasswordEmailTemplate)(event.name, "auth/resert-password", event.token));
                ch.ack(msg);
                console.log("✅ E-mail de recuperação enviado:", event.email);
            }
            catch (err) {
                console.error("❌ Falha ao processar forgotPassword:", err);
                ch.ack(msg, false);
            }
        });
    }
    catch (error) {
        console.error("❌ Falha ao iniciar consumer de forgotPassword:", error);
        throw error;
    }
}
//================ Resert Password =======================
const RESERT_PASSWORD_QUEUE = "email.forgot.password.send";
const RESERT_PASSWORD_PATTERN = "auth.resert.password.requested";
async function startResertPasswordConsumer() {
    try {
        await (0, rabbitmq_1.assertTopicExchange)(EXCHANGE);
        const ch = await (0, rabbitmq_1.assertQueueWithDLQ)(RESERT_PASSWORD_QUEUE, DLX);
        await (0, rabbitmq_1.bindQueue)(RESERT_PASSWORD_QUEUE, EXCHANGE, RESERT_PASSWORD_PATTERN);
        await ch.prefetch(10);
        console.log(`👂 Aguardando mensagens em: ${RESERT_PASSWORD_QUEUE}`);
        ch.consume(RESERT_PASSWORD_QUEUE, async (msg) => {
            if (!msg)
                return;
            try {
                const event = JSON.parse(msg.content.toString());
                if (!event.email || !event.name)
                    throw new Error("Dados de evento incompletos");
                await (0, EmailService_1.sendEmail)(event.email, "Resert Password", (0, Email_auth_1.passwordResetSuccessEmailTemplate)(event.name));
                ch.ack(msg);
                console.log("✅ E-mail de recuperação enviado:", event.email);
            }
            catch (err) {
                console.error("❌ Falha ao processar forgotPassword:", err);
                ch.ack(msg, false);
            }
        });
    }
    catch (error) {
        console.error("❌ Falha ao iniciar consumer de forgotPassword:", error);
        throw error;
    }
}

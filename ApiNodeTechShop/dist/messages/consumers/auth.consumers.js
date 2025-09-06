"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmailVerificationConsumer = startEmailVerificationConsumer;
// auth.consumers.ts - MODIFICAR
const EmailService_1 = require("../../share/services/EmailService");
const EmailTemplate_1 = require("../../share/utils/EmailTemplate");
const rabbitmq_1 = require("../rabbitmq");
const EXCHANGE = "auth.events";
const DLX = "auth.events.dlx";
const QUEUE = "email.verification.send";
const PATTERN = "auth.email.verification.requested";
async function startEmailVerificationConsumer() {
    try {
        // ✅ 1. Primeiro garantir que o exchange principal existe
        await (0, rabbitmq_1.assertTopicExchange)(EXCHANGE);
        // ✅ 2. Configurar queue com DLQ
        const ch = await (0, rabbitmq_1.assertQueueWithDLQ)(QUEUE, DLX);
        // ✅ 3. Agora fazer binding (a função bindQueue já declara o exchange)
        await (0, rabbitmq_1.bindQueue)(QUEUE, EXCHANGE, PATTERN);
        await ch.prefetch(10);
        console.log(`👂 Aguardando mensagens em: ${QUEUE} (pattern: ${PATTERN})`);
        ch.consume(QUEUE, async (msg) => {
            if (!msg)
                return;
            try {
                const event = JSON.parse(msg.content.toString());
                if (!event.email || !event.token || !event.userId) {
                    throw new Error("Dados do evento incompletos");
                }
                await (0, EmailService_1.sendEmail)(event.email, "Create Account", (0, EmailTemplate_1.createContaEmailTemplate)("/verify-email", event.token, event.userId));
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

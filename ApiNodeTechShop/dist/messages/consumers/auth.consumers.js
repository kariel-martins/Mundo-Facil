"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmailVerificationConsumer = startEmailVerificationConsumer;
// auth.consumers.ts - MODIFICAR
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
            // ... código existente
        });
    }
    catch (error) {
        console.error("❌ Falha ao iniciar consumer:", error);
        throw error;
    }
}

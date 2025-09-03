"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmailVerificationConsumer = startEmailVerificationConsumer;
// messages/consumers/auth.consumers.ts
const rabbitmq_1 = require("../rabbitmq");
const EXCHANGE = "auth.events";
const DLX = "auth.events.dlx";
const QUEUE = "email.verification.send"; // fila do serviço de e-mail
const PATTERN = "auth.email.verification.requested";
async function startEmailVerificationConsumer() {
    const ch = await (0, rabbitmq_1.assertQueueWithDLQ)(QUEUE, DLX);
    await (0, rabbitmq_1.bindQueue)(QUEUE, EXCHANGE, PATTERN);
    await ch.prefetch(10);
    console.log(`👂 Aguardando mensagens em: ${QUEUE} (pattern: ${PATTERN})`);
    ch.consume(QUEUE, async (msg) => {
        if (!msg)
            return;
        try {
            const event = JSON.parse(msg.content.toString());
            // TODO: validar com Zod (ex.: verificar campos obrigatórios)
            // await sendEmail(event.email, buildVerificationTemplate(event.token))
            ch.ack(msg);
            console.log("✅ E-mail de verificação enviado:", event.email);
        }
        catch (err) {
            console.error("❌ Falha ao processar:", err);
            // Nack sem requeue — deixa o DLX/TTL cuidar de retentativa/park
            ch.nack(msg, false, false);
        }
    });
}

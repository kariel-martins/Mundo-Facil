// auth.consumers.ts - MODIFICAR
import { sendEmail } from "../../share/services/EmailService";
import { createContaEmailTemplate } from "../../share/utils/EmailTemplate";
import {
  assertQueueWithDLQ,
  bindQueue,
  assertTopicExchange,
} from "../rabbitmq";
type verifyEventData = {
  email: string;
  token: string;
  userId: string;
};

const EXCHANGE = "auth.events";
const DLX = "auth.events.dlx";
const QUEUE = "email.verification.send";
const PATTERN = "auth.email.verification.requested";

export async function startEmailVerificationConsumer() {
  try {
    // ✅ 1. Primeiro garantir que o exchange principal existe
    await assertTopicExchange(EXCHANGE);

    // ✅ 2. Configurar queue com DLQ
    const ch = await assertQueueWithDLQ(QUEUE, DLX);

    // ✅ 3. Agora fazer binding (a função bindQueue já declara o exchange)
    await bindQueue(QUEUE, EXCHANGE, PATTERN);

    await ch.prefetch(10);
    console.log(`👂 Aguardando mensagens em: ${QUEUE} (pattern: ${PATTERN})`);

    ch.consume(QUEUE, async (msg) => {
      if (!msg) return;
      try {
        const event = JSON.parse(msg.content.toString()) as verifyEventData;
        if (!event.email || !event.token || !event.userId) {
          throw new Error(
            "Dados do evento incompletos");
        }

        await sendEmail(
          event.email,
          "Create Account",
          createContaEmailTemplate("/verify-email", event.token, event.userId)
        );
        ch.ack(msg);
        console.log("✅ E-mail de verificação enviado:", event.email);
      } catch (err) {
        console.error("❌ Falha ao processar:", err);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer:", error);
    throw error;
  }
}
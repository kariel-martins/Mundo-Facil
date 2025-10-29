import { redis } from "../../database/redis";
import { AppError } from "../../errors/AppErro";
import { createPayment } from "../../share/services/stripePayment";
import { CreatePaymentType } from "../../types/payments";
import {
  assertQueueWithDLQ,
  assertTopicExchange,
  bindQueue,
} from "../rabbitmq";

const EXCHANGE = "payments.events";
const DLX = "orders.events.dlx";

const PAYMENTS_CREATED_QUEUE = "payments.created.send";
const PAYMENTS_CREATED_PATTERN = "payments.created.requested";

export async function startPaymentsCreateConsumer() {
  try {
    await assertTopicExchange(EXCHANGE);
    const ch = await assertQueueWithDLQ(PAYMENTS_CREATED_QUEUE, DLX);
    await bindQueue(PAYMENTS_CREATED_QUEUE, EXCHANGE, PAYMENTS_CREATED_PATTERN);
    console.log(
      `👂 Aguardando mensagens em: ${PAYMENTS_CREATED_QUEUE} (pattern: ${PAYMENTS_CREATED_PATTERN})`
    );

    ch.consume(PAYMENTS_CREATED_QUEUE, async (msg) => {
    
      if (!msg) return;

      try {
        const event = JSON.parse(msg.content.toString()) as CreatePaymentType;
        const { clientSecret } = await createPayment(event);
        if (!clientSecret)throw new AppError("Erro ao encotrar clientSecret", 400);
        await redis.set("stripe:clientSecret", clientSecret, "EX", 300);

        console.log("✅ Compra iniciada por usuário:", event.user_id);
        ch.ack(msg);
      } catch (err) {
        if (err instanceof AppError) {
          ch.ack(msg, false);
          return console.error(err.message);
        }
        console.error("❌ Falha ao processar:", err);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer de OrderCreate:", error);
    throw error;
  }
}

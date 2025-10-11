import { sendEmail } from "../../share/services/EmailService";
import { orderCreatedEmailTemplate } from "../../share/templetes/Email.order";
import {
  assertQueueWithDLQ,
  assertTopicExchange,
  bindQueue,
} from "../rabbitmq";

const EXCHANGE = "orders.events";
const DLX = "orders.events.dlx";

const ORDER_CREATED_QUEUE = "order.created.send";
const ORDER_CREATED_PATTERN = "order.created.requested";

type OrderItemsEmail = {
   productImage: string; productName: string; price: string
};

interface createOrder {
  email: string;
  orders: OrderItemsEmail[];
}

export async function startOrderCreateConsumer() {
  try {
    await assertTopicExchange(EXCHANGE);
    const ch = await assertQueueWithDLQ(ORDER_CREATED_QUEUE, DLX);
    await bindQueue(ORDER_CREATED_QUEUE, EXCHANGE, ORDER_CREATED_PATTERN);
    await ch.prefetch(10);
    console.log(
      `👂 Aguardando mensagens em: ${ORDER_CREATED_QUEUE} (pattern: ${ORDER_CREATED_PATTERN})`
    );

    ch.consume(ORDER_CREATED_QUEUE, async (msg) => {
      if (!msg) return;

      try {
        const event = JSON.parse(msg.content.toString()) as createOrder;
        await sendEmail(
          event.email,
          "Pedido Feito",
          orderCreatedEmailTemplate(event.orders)
        );
        ch.ack(msg);
        console.log("✅ E-mail de verificação enviado:", event.email);
      } catch (err) {
        console.error("❌ Falha ao processar:", err);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer de OrderCreate:", error);
    throw error;
  }
}

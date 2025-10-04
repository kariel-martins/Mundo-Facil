import { sendEmail } from "../../share/services/EmailService";
import { productCreatedEmailTemplate } from "../../share/templetes/Email.product";
import {
  assertQueueWithDLQ,
  assertTopicExchange,
  bindQueue,
} from "../rabbitmq";

const EXCHANGE = "product.events";
const DLX = "product.events.dlx";

type productType = {
  email: string;
  product_id: string;
  price: number;
  productName: string;
  image: string;
  storeName: string;
};

const PRODUCT_CREATED_QUEUE = "product.created.send";
const PRODUCT_CREATED_PATTERN = "product.created.requested";

export async function startCreateProductRequest() {
  try {
    await assertTopicExchange(EXCHANGE);
    const ch = await assertQueueWithDLQ(PRODUCT_CREATED_QUEUE, DLX);
    await bindQueue(PRODUCT_CREATED_QUEUE, EXCHANGE, PRODUCT_CREATED_PATTERN);
    await ch.prefetch(10);
    console.log(
      `👂 Aguardando mensagens em: ${PRODUCT_CREATED_QUEUE} (pattern: ${PRODUCT_CREATED_PATTERN})`
    );
    ch.consume(PRODUCT_CREATED_QUEUE, async (msg) => {
      if (!msg) return;
      try {
        const event = JSON.parse(msg.content.toString()) as productType;
        if (
          !event.email ||
          !event.price ||
          !event.product_id ||
          !event.productName ||
          !event.storeName
        ) {
          throw new Error("Dados do evento incompletos");
        }
        await sendEmail(
          event.email,
          "Create Product",
          productCreatedEmailTemplate(
            event.productName,
            event.image,
            event.price,
            event.storeName,
          )
        );
        ch.ack(msg);
        console.log("✅ E-mail de recuperação enviado:", event.email);
      } catch (err) {
        console.error("❌ Falha ao processar create product:", err);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer de create product:", error);
    throw error;
  }
}

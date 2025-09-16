import { sendEmail } from "../../share/services/EmailService";
import { storeCreatedEmailTemplate } from "../../share/templetes/Email.store";
import { assertQueueWithDLQ, assertTopicExchange, bindQueue } from "../rabbitmq";

const EXCHANGE = "store.events";
const DLX = "store.events.dlx";

type productType = {
  email: string;
  storeName: string;
  image: string;
};

const STORE_CREATED_QUEUE = "store.created.send";
const STORE_CREATED_PATTERN = "store.created.requested";

export async function startCreateStoreRequest() {
  try {
    await assertTopicExchange(EXCHANGE);
    const ch = await assertQueueWithDLQ(STORE_CREATED_QUEUE, DLX);
    await bindQueue(STORE_CREATED_QUEUE, EXCHANGE, STORE_CREATED_PATTERN);
    await ch.prefetch(10);
    console.log(
      `👂 Aguardando mensagens em: ${STORE_CREATED_QUEUE} (pattern: ${STORE_CREATED_PATTERN})`
    );
    ch.consume(STORE_CREATED_QUEUE, async (msg) => {
      if (!msg) return;
      try {
        const event = JSON.parse(msg.content.toString()) as productType;
        if (
          !event.email ||
          !event.image ||
          !event.storeName
        ) {
          throw new Error("Dados do evento incompletos");
        }
        await sendEmail(
          event.email,
          "Create store",
          storeCreatedEmailTemplate(
            event.storeName,
            event.image,
          )
        );
        ch.ack(msg);
        console.log("✅ E-mail de recuperação enviado:", event.email);
      } catch (err) {
        console.error("❌ Falha ao processar create store:", err);
        ch.ack(msg, false);
      }
    });
  } catch (error) {
    console.error("❌ Falha ao iniciar consumer de create store:", error);
    throw error;
  }
}

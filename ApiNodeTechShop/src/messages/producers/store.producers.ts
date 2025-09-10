import { publish } from "../rabbitmq";

const EXCHANGE = "store.events";

type createStore = {
  storeName: string;
  name: string;
  email: string;
};
export async function publishCreatedStoreRequest(data: createStore) {
  const event = {
    ...data,
  };
  await publish(EXCHANGE, "stores.created", event, {
    headers: { "x-service": "product" },
  });
  console.log("📨 Evento publicado: stores.created", event);
}

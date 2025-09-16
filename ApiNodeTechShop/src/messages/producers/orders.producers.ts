import { publish } from "../rabbitmq";

const EXCHANGE = "orders.events";

type createOrder = {
    email: string,
    productImage: string,
    ProductName: string,
    storeName: string,
};

export async function publishCreateOrderResquest(data: createOrder) {
  const event = {
    ...data,
  };
  await publish(EXCHANGE, "order.created.requested", event, {
    headers: { "x-service": "order" },
  });
  console.log("📨 Evento publicado: stores.created", event);
}

import { publish } from "../rabbitmq";

const EXCHANGE = "orders.events";
type OrderItemsEmail = {
   productImage: string; productName: string; price: string
};

interface createOrder {
  email: string;
  orders: OrderItemsEmail[];
}
export async function publishCreateOrderResquest(data: createOrder) {
  const event = {
    ...data,
  };
  await publish(EXCHANGE, "order.created.requested", event, {
    headers: { "x-service": "order" },
  });
  console.log("📨 Evento publicado: stores.created", event);
}

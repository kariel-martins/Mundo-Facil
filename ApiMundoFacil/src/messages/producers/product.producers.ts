import { publish } from "../rabbitmq"

const EXCHANGE = "product.events"

type productType = {
  email: string;
  product_id: string;
  price: string;
  productName: string;
  image: string;
  storeName: string;
};

export async function publishCreateProductRequest(data: productType) {
    const event = {...data}
    await publish(EXCHANGE, "product.created.requested", event, {headers: {"x-service": "product"}})
    console.log("📨 Evento publicado: auth.user.created", event);
}
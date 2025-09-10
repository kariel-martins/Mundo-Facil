import { publish } from "../rabbitmq"

const EXCHANGE = "product.events"

//============== Create product ===================
type productType = {
  email: string;
  product_id: string;
  price: number;
  productName: string;
  image: string;
  storeName: string;
};

export async function publishCreateProductRequest(data: productType) {
    const event = {...data}
    await publish(EXCHANGE, "products.product.created", event, {headers: {"x-service": "product"}})
    console.log("📨 Evento publicado: auth.user.created", event);
}
import Stripe from "stripe";
import { PaymentRepository } from "../repositories/payment.repository";
import { AppError } from "../../../errors/AppErro";
import { env } from "../../../config/env";
import { publishCreateOrderResquest } from "../../../messages/producers/orders.producers";
import { CreatePaymentType } from "../../../types/payments";
import { publishCreatePaymentRequest } from "../../../messages/producers/payments.producers";
import { redis } from "../../../database/redis";


const { stripeSecretKey, stripeWebHoohSecret } = env();

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2025-09-30.clover",
});

type OrderItemsEmail = {
   productImage: string; productName: string; price: string
};

type TempCartsRedis = {
     product_id: string,
    productName: string,
    price: string,
    quantity: number,
    productImage: string
}

export { stripe };

export class PaymentService {
  private repo = new PaymentRepository();

  async createPaymentIntent(data: CreatePaymentType) {
   await publishCreatePaymentRequest(data)
   const value = await redis.get("stripe:clientSecret")
    return { clientSecret: value };
  }

  async stripeWebhook(sig: string, data: any) {
    if (!sig) throw new AppError("Missing Stripe signature", 400);

    try {
      const event = stripe.webhooks.constructEvent(
        data,
        sig,
        stripeWebHoohSecret!
      );

      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userId = paymentIntent.metadata?.userId;
        const rawCarts = await redis.get("Temp:CartStripeOrder")
        
        if (!userId || !rawCarts) {
          console.warn("⚠️ Metadados incompletos no PaymentIntent");
          return { received: true };
        }

        const cartsResponce = JSON.parse(rawCarts) as TempCartsRedis[]

        const newOrder = await this.repo.createOrder({
          user_id: userId,
          status: "pago",
          total: (paymentIntent.amount / 100).toString(),
        });

        const itemsOrder:OrderItemsEmail[] = []

        for (const item of cartsResponce) {
         
          await this.repo.createOrderProduct({
            order_id: newOrder.orders.id,
            product_id: item.product_id ?? "",
            price: item.price,
            quantity: item.quantity ?? 1,
          });
          itemsOrder.push({productName: item.productName, productImage: item.productImage, price: item.price})
        }

        await publishCreateOrderResquest({email: newOrder.users.email, orders: itemsOrder})

        console.log(`✅ Pedido #${newOrder.orders.id} criado com sucesso.`);
      }

      return { received: true };
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      throw new AppError(`Webhook Error: ${err.message}`, 400);
    }
  }
}

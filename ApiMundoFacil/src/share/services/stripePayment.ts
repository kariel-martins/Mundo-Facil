import Stripe from "stripe";
import { env } from "../../config/env";
import { AppError } from "../../errors/AppErro";
import type { CreatePaymentType } from "../../types/payments";
import { redis } from "../../database/redis";

const { stripeSecretKey } = env();

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2025-09-30.clover",
});


export async function createPayment(data: CreatePaymentType) {
  try {
    if (!data.carts?.length) throw new AppError("Carrinho vazio.");

    const totalAmount = Number(data.total) * 100; // centavos

    const saveCartsRedis = data.carts.map((item)=> ({
      product_id: item.products.id,
      productName: item.products.productName,
      price: item.products.price,
      quantity: item.carts.quantity,
      productImage: item.products.image,
    })) 
    console.log("Esse é os dados do carrinho Temporario", saveCartsRedis)

    const productSummary = data.carts
      .map(
        (item) =>
          `${item.products.productName} (x${
            item.carts.quantity ?? 1
          }) - R$${Number(item.products.price).toFixed(2)}`
      )
      .join(", ")
      .slice(0, 500);

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: Math.round(totalAmount),
        currency: "brl",
        automatic_payment_methods: { enabled: true },
        payment_method_options: {
          card: { installments: { enabled: true } },
        },
        metadata: {
          userId: data.user_id,
          products: productSummary,
        },
      },
      {
        idempotencyKey: `payment-${data.user_id}-${Date.now()}`,
      }
    );

    await redis.set("Temp:CartStripeOrder", JSON.stringify(saveCartsRedis), "EX", 1800)
    console.log(`✅ Compra iniciada por usuário: ${data.user_id} `)
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Erro ao criar PaymentIntent:", error);
    throw new AppError("Erro ao criar PaymentIntent");
  }
}

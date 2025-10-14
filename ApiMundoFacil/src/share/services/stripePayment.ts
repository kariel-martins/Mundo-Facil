import Stripe from "stripe";
import { env } from "../../config/env";
import { AppError } from "../../errors/AppErro";
import type { CreatePaymentType } from "../../types/payments";

const { stripeSecretKey } = env();

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2025-09-30.clover",
});


export async function createPayment(data: CreatePaymentType) {
  try {
    if (!data.carts?.length) throw new AppError("Carrinho vazio.");

    const totalAmount = Number(data.total) * 100; // centavos

    const itensCarts = data.carts.map((item) => ({
      productImage: item.products.image,
      productName: item.products.productName,
      price: item.products.price,
      product_id: item.products.id,
      quantity: item.carts.quantity,
    }));

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
          carts: JSON.stringify(itensCarts),
        },
      },
      {
        idempotencyKey: `payment-${data.user_id}-${Date.now()}`,
      }
    );

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Erro ao criar PaymentIntent:", error);
    throw new AppError("Erro ao criar PaymentIntent");
  }
}

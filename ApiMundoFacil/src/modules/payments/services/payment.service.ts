import Stripe from "stripe";
import { PaymentRepository } from "../repositories/payment.repository";
import { AppError } from "../../../errors/AppErro";
import { env } from "../../../config/env";
import { createOrders } from "../dtos/payment.types.dto";

const { stripeSecretKey, stripeWebHoohSecret } = env();

const stripe = new Stripe(stripeSecretKey!, {
  apiVersion: "2025-09-30.clover",
});

export { stripe };

export class PaymentService {
  private repo = new PaymentRepository();

  // ⚡️ Apenas cria o PaymentIntent, sem criar pedido ainda
  async createPaymentIntent(data: createOrders) {
    try {
      if (!data.carts?.length) throw new AppError("Carrinho vazio.");

      const totalAmount = Number(data.total) * 100; // centavos

      const itensCarts = data.carts.map((item)=> ({
        product_id: item.products.id,
        quantity: item.carts.quantity,
        price: item.products.price
      }))

      const productSummary = data.carts
        .map(
          (item) =>
            `${item.products.productName} (x${item.carts.quantity ?? 1}) - R$${Number(
              item.products.price
            ).toFixed(2)}`
        )
        .join(", ")
        .slice(0, 500);


      // 💡 Aqui usamos uma idempotencyKey para evitar PaymentIntents duplicados
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

  // 🧾 Webhook - cria o pedido somente após o pagamento ser confirmado
  async stripeWebhook(sig: string, data: string) {
    if (!sig) throw new AppError("Missing Stripe signature", 400);""
    try {
      const event = stripe.webhooks.constructEvent(
        data,
        sig,
        stripeWebHoohSecret!
      );
      console.log("verificar event", event)
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userId = paymentIntent.metadata?.userId;
        const rawCarts = paymentIntent.metadata?.carts;

        if (!userId || !rawCarts) {
          console.warn("⚠️ Metadados incompletos no PaymentIntent");
          return { received: true };
        }

        const carts = JSON.parse(rawCarts);
        console.log(carts)

        // ✅ Cria o pedido agora, após pagamento confirmado
        const newOrder = await this.repo.createOrder({
          user_id: userId,
          status: "pago",
          total: (paymentIntent.amount / 100).toString(),
        });

        for (const item of carts) {
          await this.repo.createOrderProduct({
            order_id: newOrder.id,
            product_id: item.products.id ?? "",
            price: item.products.price,
            quantity: item.carts.quantity ?? 1,
          });
        }

        console.log(`✅ Pedido #${newOrder.id} criado com sucesso.`);
      }

      return { received: true };
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      throw new AppError(`Webhook Error: ${err.message}`, 400);
    }
  }
}

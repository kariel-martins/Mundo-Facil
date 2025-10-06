import { Request, Response } from "express";
import { stripe } from "../services/payment.service";
import { orders } from "../../../database/schema.database";
import Stripe from "stripe";
import { db } from "../../../database/client.database";


export const createCheckoutSession = async (req: Request, res: Response) => {
try {
const { data, orderId } = req.body; // items: [{name, price, quantity, id?}] and optional orderId


const line_items = data.map((item: any) => ({
price_data: {
currency: "brl",
product_data: { name: item.name },
unit_amount: Math.round(item.price * 100),
},
quantity: item.quantity,
}));


const session = await stripe.checkout.sessions.create({
payment_method_types: ["card"],
mode: "payment",
line_items,
success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.FRONTEND_URL}/cancel`,
metadata: {
orderId: orderId ?? "",
},
});


return res.json({ sessionId: session.id });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Erro ao criar sessão de pagamento" });
}
};


export const stripeWebhook = async (req: Request, res: Response) => {
const sig = req.headers["stripe-signature"] as string | undefined;


if (!sig) return res.status(400).send("Missing Stripe signature");


try {
const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);


switch (event.type) {
case "checkout.session.completed": {
const session = event.data.object as Stripe.Checkout.Session;
const orderId = session.metadata?.orderId;
// Atualize seu pedido no banco de dados
if (orderId) {
await db.update(orders).set(req.body)
}
break;
}
// trate outros eventos se necessário
default:
break;
}


res.json({ received: true });
} catch (err: any) {
console.error("Webhook error:", err.message);
res.status(400).send(`Webhook Error: ${err.message}`);
}
};
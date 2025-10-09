import { Router } from "express";
import { rawBodyMiddleware } from "../../../share/middleware/rawBodyMiddleware";
import { createPaymentIntent, stripeWebhook } from "../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/create-session", createPaymentIntent);
paymentRouter.post("/webhook", rawBodyMiddleware, stripeWebhook);

export { paymentRouter };
import { Router } from "express";
import { rawBodyMiddleware } from "../../../share/middleware/rawBodyMiddleware";
import { createCheckoutSession, stripeWebhook } from "../controllers/payment.controller";

const paymentRouter = Router();



paymentRouter.post("/create-session", createCheckoutSession);
paymentRouter.post("/webhook", rawBodyMiddleware, stripeWebhook);

export { paymentRouter };
import { Router } from "express";
import { createPaymentIntent} from "../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/create-session", createPaymentIntent);

export { paymentRouter};
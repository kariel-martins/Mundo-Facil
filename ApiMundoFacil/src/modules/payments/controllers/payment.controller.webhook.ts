import express from "express";
import Stripe from "stripe";
import { Request, Response } from "express";
import { env } from "../../../config/env";
import { AppError } from "../../../errors/AppErro";
import { PaymentService } from "../services/payment.service";

const webhookRouter = express.Router();

const service = new PaymentService();

webhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
      const sig = req.headers["stripe-signature"] as string;
      const stripeEvent = await service.stripeWebhook(sig, req.body);

      res.status(200).json(stripeEvent);
    } catch (error) {
      if (error instanceof AppError) {
        return res
          .status(error.statusCode)
          .json({ errors: { default: error.message } });
      }
      return res.status(500).json({
        message: "Erro ao processar updateOrder",
        context: "payment/controllers/payment.controller.ts/stripeWebhook",
      });
    }
  }
);

export { webhookRouter };

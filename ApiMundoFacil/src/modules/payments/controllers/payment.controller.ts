import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";
import { AppError } from "../../../errors/AppErro";

const service = new PaymentService();

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const clientSecret = await service.createPaymentIntent(data);
    return res.json(clientSecret);
  } catch (error) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    return res.status(500).json({
      message: "Erro ao criar PaymentIntent",
      context: "payment/controllers/payment.controller.ts/createPaymentIntent",
    });
  }
};

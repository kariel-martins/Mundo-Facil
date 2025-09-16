import { RequestHandler } from "express";
import { OrderService } from "../services/order.service";
import { AppError } from "../../../errors/AppErro";

const service = new OrderService();

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const {quantity, store_id } = req.body
    const { user_id } = req.params
    const { product_id } = req.query as { product_id: string}
    const order = await service.createOrder({user_id, store_id, product_id,quantity});
    return res.status(201).json({ order });
  } catch (error: any) {
        if (error instanceof AppError) {
          return res
          .status(error.statusCode)
          .json({ errors: { default: error.message } });
        }
        return res.status(500).json({message: "Erro ao processar createOrder", context: "orders/controllers/order.controller.ts/createOrder"})
      }
};

export const getByIdOrder: RequestHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await service.getByIdOrder(order_id);
    return res.status(200).json({ order });
  } catch (error: any) {
        if (error instanceof AppError) {
          return res
          .status(error.statusCode)
          .json({ errors: { default: error.message } });
        }
        return res.status(500).json({message: "Erro ao processar getByIdOrder", context: "orders/controllers/order.controller.ts/getByIdOrder"})
      }
};

export const getAllOrders: RequestHandler = async (_req, res) => {
  try {
    const orders = await service.getAllOrders();
    return res.status(200).json({ orders });
  } catch (error: any) {
        if (error instanceof AppError) {
          return res
          .status(error.statusCode)
          .json({ errors: { default: error.message } });
        }
        return res.status(500).json({message: "Erro ao processar getAllOrders", context: "orders/controllers/order.controller.ts/getAllOrders"})
      }
};

export const updateOrder: RequestHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await service.updateOrder(order_id, req.body);
    return res.status(200).json({ order });
  } catch (error: any) {
        if (error instanceof AppError) {
          return res
          .status(error.statusCode)
          .json({ errors: { default: error.message } });
        }
        return res.status(500).json({message: "Erro ao processar updateOrder", context: "orders/controllers/order.controller.ts/updateOrder"})
      }
};

export const deleteOrder: RequestHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await service.deleteOrder(order_id);
    return res.status(200).json({ order });
  } catch (error: any) {
        if (error instanceof AppError) {
          return res
          .status(error.statusCode)
          .json({ errors: { default: error.message } });
        }
        return res.status(500).json({message: "Erro ao processar deleteOrder", context: "orders/controllers/order.controller.ts/deleteOrder"})
      }
};

import { RequestHandler } from "express";
import { OrderService } from "../services/order.service";

const service = new OrderService();

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const order = await service.createOrder(req.body);
    return res.status(201).json({ order });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ errors: { default: error.message } });
  }
};

export const getByIdOrder: RequestHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await service.getByIdOrder(order_id);
    return res.status(200).json({ order });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ errors: { default: error.message } });
  }
};

export const getAllOrders: RequestHandler = async (_req, res) => {
  try {
    const orders = await service.getAllOrders();
    return res.status(200).json({ orders });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ errors: { default: error.message } });
  }
};

export const updateOrder: RequestHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await service.updateOrder(order_id, req.body);
    return res.status(200).json({ order });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ errors: { default: error.message } });
  }
};

export const deleteOrder: RequestHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await service.deleteOrder(order_id);
    return res.status(200).json({ order });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ errors: { default: error.message } });
  }
};

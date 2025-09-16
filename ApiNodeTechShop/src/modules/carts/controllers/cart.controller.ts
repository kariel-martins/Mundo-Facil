import { RequestHandler } from "express";
import { CartService } from "../services/cart.service";
import { AppError } from "../../../errors/AppErro";

const service = new CartService();

export const createCart: RequestHandler = async (req, res) => {
  try {
     const { quantity } = req.body;
  const { user_id, cart_id: product_id } = req.params
    const cart = await service.createCart({ user_id, product_id, quantity });
    return res.status(201).json({ cart });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar createCart", context: "carts/controllers/cart.controller.ts/createCart"})
    }
};

export const getByIdCart: RequestHandler = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const cart = await service.getByIdCart(cart_id);
    return res.status(200).json({ cart });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar getByIdCart", context: "carts/controllers/cart.controller.ts/getByIdCart"})
    }
};

export const getAllCart: RequestHandler = async (_req, res) => {
  try {
    const carts = await service.getAllCart();
    return res.status(200).json({ carts });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar getAllCart", context: "carts/controllers/cart.controller.ts/getAllCart"})
    }
};

export const updateCart: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
  const { cart_id } = req.params;
    const cart = await service.updateCart(cart_id, data);
    return res.status(200).json({ cart });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar updateCart", context: "carts/controllers/cart.controller.ts/updateCart"})
    }
};

export const deleteCart: RequestHandler = async (req, res) => {
  try {
     const { cart_id } = req.params;
    const cart = await service.deleteCart(cart_id);
    return res.status(200).json({ cart });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar deleteCart", context: "carts/controllers/cart.controller.ts/deleteCart"})
    }
};

import { RequestHandler } from "express";
import { CartService } from "../services/cart.service";

const service = new CartService();

export const createCart: RequestHandler = async (req, res) => {
  const { quantity } = req.body;
  const { user_id, cart_id: product_id } = req.params

  if (!quantity || !product_id || !user_id) {
    return res.status(400).json({ errors: { default: "Todos os campos são obrigatórios" } });
  }

  try {
    const cart = await service.createCart({ user_id, product_id, quantity });
    return res.status(201).json({ cart });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao criar o carrinho" } });
  }
};

export const getByIdCart: RequestHandler = async (req, res) => {
  const { cart_id } = req.params;

  if (!cart_id) {
    return res.status(400).json({ errors: { default: "cart_id é obrigatório" } });
  }

  try {
    const cart = await service.getByIdCart(cart_id);
    if (!cart) {
      return res.status(404).json({ errors: { default: "carrinho não encontrado" } });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao buscar carrinho" } });
  }
};

export const getAllCart: RequestHandler = async (_req, res) => {
  try {
    const carts = await service.getAllCart();
    if (!carts || carts.length === 0) {
      return res.status(404).json({ errors: { default: "Nenhum carrinho encontrado" } });
    }

    return res.status(200).json({ carts });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao buscar carrinhos" } });
  }
};

export const updateCart: RequestHandler = async (req, res) => {
  const data = req.body;
  const { cart_id } = req.params;

  if (!cart_id || !data) {
    return res.status(400).json({ errors: { default: "Todos os campos são obrigatórios" } });
  }

  try {
    const cart = await service.updateCart(cart_id, data);
    if (!cart) {
      return res.status(404).json({ errors: { default: "Carrinho não encontrado" } });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao atualizar o carrinho" } });
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  const { cart_id } = req.params;

  if (!cart_id) {
    return res.status(400).json({ errors: { default: "cart_id é obrigatório" } });
  }

  try {
    const cart = await service.deleteCart(cart_id);
    if (!cart) {
      return res.status(404).json({ errors: { default: "Carrinho não encontrado" } });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao deletar carrinho" } });
  }
};

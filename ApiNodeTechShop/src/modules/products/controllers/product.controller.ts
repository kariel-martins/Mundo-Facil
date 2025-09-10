import { RequestHandler } from "express";
import { ProductService } from "../services/service.product";

const service = new ProductService();

export const createProduct: RequestHandler = async (req, res) => {
  const { store_id, productName, price, image, estoque } = req.body;

  if (!productName || !price || !image || !estoque || !store_id) {
    return res.status(400).json({ errors: { default: "Todos os campos são obrigatórios" } });
  }

  try {
    const product = await service.createProduct({ store_id, productName, price, image, estoque });
    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao criar o produto" } });
  }
};

export const getByIdProduct: RequestHandler = async (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).json({ errors: { default: "product_id é obrigatório" } });
  }

  try {
    const product = await service.getByIdProduct(product_id);
    if (!product) {
      return res.status(404).json({ errors: { default: "Produto não encontrado" } });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao buscar produto" } });
  }
};

export const getAllProduct: RequestHandler = async (_req, res) => {
  try {
    const products = await service.getAllProduct();
    if (!products || products.length === 0) {
      return res.status(404).json({ errors: { default: "Nenhum produto encontrado" } });
    }

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao buscar produtos" } });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { data } = req.body;
  const { id: product_id } = req.params;

  if (!product_id || !data) {
    return res.status(400).json({ errors: { default: "Todos os campos são obrigatórios" } });
  }

  try {
    const product = await service.updateProduct(product_id, data);
    if (!product) {
      return res.status(404).json({ errors: { default: "Produto não encontrado" } });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao atualizar o produto" } });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).json({ errors: { default: "product_id é obrigatório" } });
  }

  try {
    const product = await service.deleteProduct(product_id);
    if (!product) {
      return res.status(404).json({ errors: { default: "Produto não encontrado" } });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao deletar produto" } });
  }
};

import { RequestHandler } from "express";
import { ProductService } from "../services/service.product";

const service = new ProductService();

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { store_id } = req.params;
    const product = await service.create(store_id, req.body);
    return res.status(201).json({ product });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ errors: { default: error.message } });
  }
};

export const getByIdProduct: RequestHandler = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await service.getById(product_id);
    return res.status(200).json({ product });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ errors: { default: error.message } });
  }
};

export const getAllProduct: RequestHandler = async (_req, res) => {
  try {
    const products = await service.getAll();
    return res.status(200).json({ products });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ errors: { default: error.message } });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await service.update(product_id, req.body);
    return res.status(200).json({ product });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ errors: { default: error.message } });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await service.delete(product_id);
    return res.status(200).json({ product });
  } catch (error: any) {
    return res
      .status(error.statusCode || 500)
      .json({ errors: { default: error.message } });
  }
};

import { RequestHandler } from "express";
import { ProductService } from "../services/service.product";
import { AppError } from "../../../errors/AppErro";
import redis  from "../../../database/redis"

const service = new ProductService();

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { store_id } = req.params;
    const product = await service.create(store_id, req.body)
    return res.status(201).json({ product });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar createProduct", context: "products/controllers/product.controller.ts/createProduct"})
    }
};

export const getByIdProduct: RequestHandler = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await service.getById(product_id);
    return res.status(200).json({ product });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar getByIdProduct", context: "products/controllers/product.controller.ts/getByIdProduct"})
    }
};

export const getAllProduct: RequestHandler = async (_req, res) => {
  try {
    const products = await service.getAll();
    await redis.set("produtos:all", JSON.stringify(products), "EX", 300)
    return res.status(200).json({ products });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar getAllProduct", context: "products/controllers/product.controller.ts/getAllProduct"})
    }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await service.update(product_id, req.body);
    return res.status(200).json({ product });
  }  catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar updateProduct", context: "products/controllers/product.controller.ts/updateProduct"})
    }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await service.delete(product_id);
    return res.status(200).json({ product });
  }  catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar deleteProduct", context: "products/controllers/product.controller.ts/deleteProduct"})
    }
};

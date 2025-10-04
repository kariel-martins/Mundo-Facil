import { RequestHandler } from "express";
import { StoreService } from "../services/store.service";
import { AppError } from "../../../errors/AppErro";

const service = new StoreService();
export const createStore: RequestHandler = async (req, res) => {
  try {
    const { storeName, image, email } = req.body;
    const { boss_id } = req.params;
    const store = await service.create({ boss_id, storeName, email }, image);
    return res.status(201).json({ store });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    return res
      .status(500)
      .json({
        message: "Erro ao processar createStore",
        context: "stores/controllers/store.controller.ts/createStore",
      });
  }
};
export const getStore: RequestHandler = async (req, res) => {
  try {
    const { store_id } = req.params;
    const store = await service.getById(store_id);
    return res.status(201).json({ store });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    return res
      .status(500)
      .json({
        message: "Erro ao processar getStore",
        context: "stores/controllers/store.controller.ts/getStore",
      });
  }
};
export const getAllStore: RequestHandler = async (req, res) => {
  try {
    const { boss_id } = req.params
    const store = await service.getAll(boss_id);
    return res.status(201).json( store );
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    return res
      .status(500)
      .json({
        message: "Erro ao processar getAllStore",
        context: "stores/controllers/store.controller.ts/getAllStore",
      });
  }
};
export const updateStore: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    const { boss_id } = req.params;
    const store = await service.update(boss_id, data);
    return res.status(201).json({ store });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    return res
      .status(500)
      .json({
        message: "Erro ao processar updateStore",
        context: "stores/controllers/store.controller.ts/updateStore",
      });
  }
};
export const deleteStore: RequestHandler = async (req, res) => {
  try {
    const { boss_id } = req.params;
    const store = await service.delete(boss_id);
    return res.status(201).json({ store });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
    }
    return res
      .status(500)
      .json({
        message: "Erro ao processar deleteStore",
        context: "stores/controllers/store.controller.ts/deleteStore",
      });
  }
};

import { RequestHandler } from "express";
import { StoreService } from "../services/store.service";

const service = new StoreService();
export const createStore: RequestHandler = async (req, res) => {
  const { storeName, image, email } = req.body;
  const { boss_id } = req.params;
  if (!storeName || !image || !email || !boss_id) {
    return res
      .status(400)
      .json({ errors: { default: "Todos campos são obrigatorios" } });
  }
  try {
    const store = await service.create(
      { boss_id, storeName, email },
      image
    );
    if (!store) {
      return res
        .status(404)
        .json({ errors: { default: "Não foi possível criar a loja" } });
    }
    return res.status(201).json({ store });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao processar o registerStore" } });
  }
};
export const getStore: RequestHandler = async (req, res) => {
  const { store_id } = req.params;
  if (!store_id) {
    return res
      .status(400)
      .json({ errors: { default: "Boss_id não encontrado" } });
  }
  try {
    const store = await service.getById(store_id);
    if (!store) {
      return res
        .status(404)
        .json({ errors: { default: "Não foi possível encontra a loja" } });
    }
    return res.status(201).json({ store });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao processar o getStore" } });
  }
};
export const getAllStore: RequestHandler = async (_req, res) => {
  try {
    const store = await service.getAll();
    if (!store) {
      return res
        .status(404)
        .json({ errors: { default: "Não lojas cadastradas" } });
    }
    return res.status(201).json({ store });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao processar o getAllStore" } });
  }
};
export const updateStore: RequestHandler = async (req, res) => {
  const data = req.body;
  const { boss_id } = req.params;
  if (!data || !boss_id) {
    return res
      .status(400)
      .json({ errors: { default: "Todos campos são obrigatorios" } });
  }
  try {
    const store = await service.update(boss_id, data);
    if (!store) {
      return res
        .status(404)
        .json({ errors: { default: "Não foi possível atualizar a loja" } });
    }
    return res.status(201).json({ store });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao processar o updateStore" } });
  }
};
export const deleteStore: RequestHandler = async (req, res) => {
  const { boss_id } = req.params;
  if (!boss_id) {
    return res
      .status(400)
      .json({ errors: { default: "Boss_id não encontrado" } });
  }
  try {
    const store = await service.delete(boss_id);
    if (!store) {
      return res
        .status(404)
        .json({ errors: { default: "Não foi possível deletar a loja" } });
    }
    return res.status(201).json({ store });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao processar o deleteStore" } });
  }
};

import { RequestHandler } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export const getUser: RequestHandler = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res
      .status(404)
      .json({ errors: { default: "User_id não encontrado" } });
  }

  try {
    const user = await service.getByIdUser(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ errors: { default: "Usuário não encontrado" } });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao processar a buscar de usuário" } });
  }
};

export const getAllUser: RequestHandler = async (_req, res) => {
  try {
    const users = await service.getByIdAllUser();
    if (!users) {
      return res.status(404).json({ errors: { default: "Não há usuários" } });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao processar a buscar de usuários" } });
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  if (!user_id || !data) {
    return res
      .status(404)
      .json({ errors: { default: "User_id ou data não encontrado" } });
  }

  try {
    const user = await service.updateUser(user_id, data);
    if (!user) {
      return res
        .status(404)
        .json({ errors: { default: "Não foi possível atualizar o produto" } });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro ao atualizar o produto" } });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res
      .status(404)
      .json({ errors: { default: "User_id não encontrado" } });
  }

  try {
    const user = await service.deleteUser(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ errors: { default: "Não foi possível deletar o usuário" } });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: { default: "Erro deletar o usuário" } });
  }
};

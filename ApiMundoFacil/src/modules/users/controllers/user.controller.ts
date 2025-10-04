import { RequestHandler } from "express";
import { UserService } from "../services/user.service";
import { AppError } from "../../../errors/AppErro";

const service = new UserService();

export const getUser: RequestHandler = async (req, res) => {
  try {
    const { user_id } = req.params
    const user = await service.getByIdUser(user_id);
    return res.status(200).json({ user });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
      .status(error.statusCode)
      .json({ errors: { default: error.message } });
    }
    return res.status(500).json({message: "Erro ao processar getUser", context: "users/controllers/user.controller.ts/getUser"})
  }
};

export const getAllUser: RequestHandler = async (_req, res) => {
  try {
    const users = await service.getByIdAllUser();
    return res.status(200).json({ users });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
      .status(error.statusCode)
      .json({ errors: { default: error.message } });
    }
    return res.status(500).json({message: "Erro ao processar getAllUser", context: "users/controllers/user.controller.ts/getAllUser"})
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { user_id } = req.params
    const data = req.body
    const user = await service.updateUser(user_id, data);
    return res.status(200).json({ user });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
      .status(error.statusCode)
      .json({ errors: { default: error.message } });
    }
    return res.status(500).json({message: "Erro ao processar updateUser", context: "users/controllers/user.controller.ts/updateUser"})
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { user_id } = req.params
    const user = await service.deleteUser(user_id);
    return res.status(200).json({ user });
  } catch (error: any) {
    if (error instanceof AppError) {
      return res
      .status(error.statusCode)
      .json({ errors: { default: error.message } });
    }
    return res.status(500).json({message: "Erro ao processar deleteUser", context: "users/controllers/user.controller.ts/deleteUser"})
  }
};

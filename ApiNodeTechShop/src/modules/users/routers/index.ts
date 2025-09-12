import { Router } from "express";
import { validateUserById } from "../dtos/user.schemas.dto";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.get("/:user_id", validateUserById, getUser);
UserRouter.get("/", getAllUser);
UserRouter.put("/:user_id", validateUserById, updateUser);
UserRouter.delete("/:user_id", validateUserById, deleteUser);

export { UserRouter };

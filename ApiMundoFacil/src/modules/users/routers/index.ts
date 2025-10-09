import { Router } from "express";
import { validateUserById } from "../dtos/user.schemas.dto";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { Authorization } from "../../../share/middleware/autentication";

const UserRouter = Router();

UserRouter.get("/:user_id", Authorization,validateUserById, getUser);
UserRouter.get("/", Authorization,getAllUser);
UserRouter.put("/:user_id", Authorization,validateUserById, updateUser);
UserRouter.delete("/:user_id", Authorization,validateUserById, deleteUser);

export { UserRouter };

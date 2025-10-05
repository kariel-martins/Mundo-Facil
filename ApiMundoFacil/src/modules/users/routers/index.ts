import { Router } from "express";
import { validateUserById } from "../dtos/user.schemas.dto";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { Autorization } from "../../../share/middleware/autentication";

const UserRouter = Router();

UserRouter.get("/:user_id", Autorization,validateUserById, getUser);
UserRouter.get("/", Autorization,getAllUser);
UserRouter.put("/:user_id", Autorization,validateUserById, updateUser);
UserRouter.delete("/:user_id", Autorization,validateUserById, deleteUser);

export { UserRouter };

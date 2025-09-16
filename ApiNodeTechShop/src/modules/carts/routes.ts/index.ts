import { Router } from "express";
import { createCart, deleteCart, getAllCart, getByIdCart, updateCart } from "../controllers/cart.controller";
import { validateCartSchemaById, validateCartSchemaCreate, validateCartSchemaUpdate } from "../dtos/cart.schema.dto";

const CartRouter = Router()

CartRouter.get("/:cart_id",validateCartSchemaCreate, getByIdCart)
CartRouter.get("/", getAllCart)
CartRouter.post("/:user_id",validateCartSchemaById, createCart)
CartRouter.put("/:cart_id",validateCartSchemaUpdate, updateCart)
CartRouter.delete("/:cart_id",validateCartSchemaById, deleteCart)

export { CartRouter }
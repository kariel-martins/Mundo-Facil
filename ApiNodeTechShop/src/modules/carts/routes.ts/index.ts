import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart } from "../controllers/cart.controller";
import { validateCartSchema, validateCartSchemaById, validateCartSchemaCreate, validateCartSchemaUpdate } from "../dtos/cart.schema.dto";

const CartRouter = Router()

CartRouter.get("/:user_id",validateCartSchema, getCart)
CartRouter.post("/",validateCartSchemaCreate, createCart)
CartRouter.put("/:cart_id",validateCartSchemaUpdate, updateCart)
CartRouter.delete("/:cart_id",validateCartSchemaById, deleteCart)

export { CartRouter }
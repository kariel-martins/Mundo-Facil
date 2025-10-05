import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart } from "../controllers/cart.controller";
import { validateCartSchema, validateCartSchemaById, validateCartSchemaCreate, validateCartSchemaUpdate } from "../dtos/cart.schema.dto";
import { Autorization } from "../../../share/middleware/autentication";

const CartRouter = Router()

CartRouter.get("/:user_id", Autorization, validateCartSchema, getCart)
CartRouter.post("/", Autorization,validateCartSchemaCreate, createCart)
CartRouter.put("/:cart_id", Autorization,validateCartSchemaUpdate, updateCart)
CartRouter.delete("/:cart_id", Autorization,validateCartSchemaById, deleteCart)

export { CartRouter }
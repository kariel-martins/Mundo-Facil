import { Router } from "express";
import { createCart, deleteCart, getCart, updateCart } from "../controllers/cart.controller";
import { validateCartSchema, validateCartSchemaById, validateCartSchemaCreate, validateCartSchemaUpdate } from "../dtos/cart.schema.dto";
import { Authorization } from "../../../share/middleware/autentication";

const CartRouter = Router()

CartRouter.get("/:user_id", Authorization, validateCartSchema, getCart)
CartRouter.post("/", Authorization,validateCartSchemaCreate, createCart)
CartRouter.put("/:cart_id", Authorization,validateCartSchemaUpdate, updateCart)
CartRouter.delete("/:cart_id", Authorization,validateCartSchemaById, deleteCart)

export { CartRouter }
import { Router } from "express";
import { createCart, deleteCart, getAllCart, getByIdCart, updateCart } from "../controllers/cart.controller";

const CartRouter = Router()

CartRouter.get("/:cart_id", getByIdCart)
CartRouter.get("/", getAllCart)
CartRouter.post("/:user_id", createCart)
CartRouter.put("/:cart_id", updateCart)
CartRouter.delete("/:cart_id", deleteCart)

export { CartRouter }
import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
import { validateOrderSchemaById, validateOrderSchemaCreate, validateOrderSchemaUpdate } from "../dtos/order.schema.dto";
import { Autorization } from "../../../share/middleware/autentication";

const OrderRouter = Router();

OrderRouter.post("/", Autorization,validateOrderSchemaCreate, createOrder);
OrderRouter.get("/:user_id", Autorization,validateOrderSchemaById, getAllOrders);
OrderRouter.put("/:order_id", Autorization,validateOrderSchemaUpdate, updateOrder);
OrderRouter.delete("/:order_id", Autorization,validateOrderSchemaById, deleteOrder);

export  { OrderRouter };

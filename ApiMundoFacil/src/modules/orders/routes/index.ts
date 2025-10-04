import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
import { validateOrderSchemaById, validateOrderSchemaCreate, validateOrderSchemaUpdate } from "../dtos/order.schema.dto";

const OrderRouter = Router();

OrderRouter.post("/", validateOrderSchemaCreate, createOrder);
OrderRouter.get("/:user_id", validateOrderSchemaById, getAllOrders);
OrderRouter.put("/:order_id", validateOrderSchemaUpdate, updateOrder);
OrderRouter.delete("/:order_id", validateOrderSchemaById, deleteOrder);

export  { OrderRouter };

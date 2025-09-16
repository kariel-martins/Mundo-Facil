import { Router } from "express";
import {
  createOrder,
  getByIdOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
import { validateOrderSchemaById, validateOrderSchemaCreate, validateOrderSchemaUpdate } from "../dtos/order.schema.dto";

const OrderRouter = Router();

OrderRouter.post("/",validateOrderSchemaCreate, createOrder);
OrderRouter.get("/", getAllOrders);
OrderRouter.get("/:order_id", validateOrderSchemaById, getByIdOrder);
OrderRouter.put("/:order_id", validateOrderSchemaUpdate, updateOrder);
OrderRouter.delete("/:order_id", validateOrderSchemaById, deleteOrder);

export  { OrderRouter };

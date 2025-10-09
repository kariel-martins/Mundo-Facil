import { Router } from "express";
import {
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";
import { validateOrderSchemaById, validateOrderSchemaUpdate } from "../dtos/order.schema.dto";
import { Authorization } from "../../../share/middleware/autentication";

const OrderRouter = Router();

OrderRouter.get("/:user_id", Authorization,validateOrderSchemaById, getAllOrders);
OrderRouter.put("/:order_id", Authorization,validateOrderSchemaUpdate, updateOrder);
OrderRouter.delete("/:order_id", Authorization,validateOrderSchemaById, deleteOrder);

export  { OrderRouter };

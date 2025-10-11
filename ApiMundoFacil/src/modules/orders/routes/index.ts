import { Router } from "express";
import {
  getAllOrders,
  updateOrder,
  deleteOrder,
  getAllOrdersItems,
} from "../controllers/order.controller";
import { validateOrderSchemaByIdOrders, validateOrderSchemaByIdUsers, validateOrderSchemaUpdate } from "../dtos/order.schema.dto";
import { Authorization } from "../../../share/middleware/autentication";

const OrderRouter = Router();

OrderRouter.get("/order/:user_id", Authorization,validateOrderSchemaByIdUsers, getAllOrders);

OrderRouter.get("/items/:order_id", Authorization,validateOrderSchemaByIdOrders, getAllOrdersItems);

OrderRouter.put("/:order_id", Authorization,validateOrderSchemaUpdate, updateOrder);
OrderRouter.delete("/:order_id", Authorization,validateOrderSchemaByIdUsers, deleteOrder);

export  { OrderRouter };

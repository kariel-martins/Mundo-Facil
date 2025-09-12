import { Router } from "express";
import {
  createOrder,
  getByIdOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";

const OrderRouter = Router();

OrderRouter.post("/", createOrder);
OrderRouter.get("/", getAllOrders);
OrderRouter.get("/:order_id", getByIdOrder);
OrderRouter.put("/:order_id", updateOrder);
OrderRouter.delete("/:order_id", deleteOrder);

export  { OrderRouter };

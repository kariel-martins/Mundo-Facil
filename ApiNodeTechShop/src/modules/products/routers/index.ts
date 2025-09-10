import { Router } from "express";
import {
  createProduct,
  getByIdProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:product_id", getByIdProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:product_id", deleteProduct);

export { productRouter };

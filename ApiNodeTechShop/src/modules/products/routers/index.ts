import { Router } from "express";
import {
  createProduct,
  getByIdProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/:store_id", createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:product_id", getByIdProduct);
productRouter.put("/:product_id", updateProduct);
productRouter.delete("/:product_id", deleteProduct);

export { productRouter };

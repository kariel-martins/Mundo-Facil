import { Router } from "express";
import {
  createProduct,
  getByIdProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";
import { cacheProdutos } from "../../../share/middleware/cache";
import { Autorization } from "../../../share/middleware/autentication";

const productRouter = Router();

productRouter.post("/:store_id", Autorization,createProduct);
productRouter.get("/", cacheProdutos, getAllProduct);
productRouter.get("/:product_id", getByIdProduct);
productRouter.put("/:product_id", Autorization,updateProduct);
productRouter.delete("/:product_id", Autorization,deleteProduct);

export { productRouter };

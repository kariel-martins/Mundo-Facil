import { Router } from "express";
import { authRouter } from "./modules/Auth/routers";
import { productRouter } from "./modules/products/routers";

const router = Router()

router.get("/", (_req, res) => res.status(200).json({ message: "servidor rodando" }));

router.use("/auth", authRouter)
router.use("/products", productRouter)

export { router }
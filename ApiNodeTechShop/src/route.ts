import { Router } from "express";
import { authRouter } from "./modules/Auth/routers";
import { productRouter } from "./modules/products/routers";
import { UserRouter } from "./modules/users/routers";
import { StoreRouter } from "./modules/stores/routes";
import { CartRouter } from "./modules/carts/routes.ts";

const router = Router()

router.get("/", (_req, res) => res.status(200).json({ message: "servidor rodando" }));

router.use("/api/auth", authRouter)
router.use("/api/products", productRouter)
router.use("/api/users", UserRouter)
router.use("/api/stores", StoreRouter)
router.use("/api/carts", CartRouter)

export { router }
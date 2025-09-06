import {type Request, type Response, Router } from "express";
import { validateSigUp } from "./modules/Auth/dtos/schemas.dto";
import { signUp, verifyEmail } from "./modules/Auth/controllers/controller.auth";

const router = Router()

router.get("/", (_req: Request, res: Response)=> {res.status(200).json({message: "servidor rodando"})})
router.post("/signUp", validateSigUp ,signUp)
router.get("/verify-email", verifyEmail)

export { router }
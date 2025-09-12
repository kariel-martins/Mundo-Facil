import { Router } from "express";
import {
  signUp,
  signIn,
  verifyAuthenticationUser,
  forgotPassword,
  resetPassword
} from "../controllers/controller.auth";
import {
  validateSignUpRequestedSchema,
  validateSignInRequestedSchema,
  validateEmailVerificationRequestedSchema,
  validateEmailRequestedSchema,
  validateResetPasswordRequestedSchema
} from "../dtos/schemas.dto";

const authRouter = Router();

authRouter.post("/signup", validateSignUpRequestedSchema, signUp);
authRouter.post("/signin", validateSignInRequestedSchema, signIn);
authRouter.get("/verify-email", validateEmailVerificationRequestedSchema,verifyAuthenticationUser);
authRouter.post("/forgot-password", validateEmailRequestedSchema, forgotPassword);
authRouter.post("/reset-password", validateResetPasswordRequestedSchema, resetPassword);

export { authRouter };

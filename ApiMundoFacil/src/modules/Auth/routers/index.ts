import { Router } from "express";
import {
  signUp,
  signIn,
  verifyAuthenticationEmailUser,
  forgotPassword,
  resetPassword,
  verifyAuthentication
} from "../controllers/controller.auth";
import {
  validateSignUpRequestedSchema,
  validateSignInRequestedSchema,
  validateEmailVerificationRequestedSchema,
  validateEmailRequestedSchema,
  validateResetPasswordRequestedSchema
} from "../dtos/schemas.dto";
import { Authorization } from "../../../share/middleware/autentication";

const authRouter = Router();

authRouter.post("/signup", validateSignUpRequestedSchema, signUp);
authRouter.post("/signin", validateSignInRequestedSchema, signIn);
authRouter.get("/verify", Authorization, verifyAuthentication);
authRouter.get("/verify-email", validateEmailVerificationRequestedSchema,verifyAuthenticationEmailUser);
authRouter.post("/forgot-password", validateEmailRequestedSchema, forgotPassword);
authRouter.post("/reset-password", validateResetPasswordRequestedSchema, resetPassword);

export { authRouter };

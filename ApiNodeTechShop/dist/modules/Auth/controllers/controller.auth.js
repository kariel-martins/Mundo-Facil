"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.signIn = exports.verifyAuthenticationUser = exports.signUp = void 0;
const service_auth_1 = require("../services/service.auth");
const AppErro_1 = require("../../../errors/AppErro");
const service = new service_auth_1.AuthService();
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await service.registerUser({ name, email, password });
        return res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof AppErro_1.AppError) {
            return res
                .status(error.statusCode)
                .json({ errors: { default: error.message } });
        }
        return res.status(500).json({ message: "Erro ao processar signUp", context: "auth/controllers/auth.controller.ts/signUp" });
    }
};
exports.signUp = signUp;
const verifyAuthenticationUser = async (req, res) => {
    const { user_id, token } = req.query;
    if (typeof token !== "string" || typeof user_id !== "string") {
        return res.status(401).json({ errors: { default: "Token e user_id não são válidos" } });
    }
    try {
        const verifyUser = await service.verifyAuthentication(user_id, token);
        return res.status(200).json({ verifyUser });
    }
    catch (error) {
        if (error instanceof AppErro_1.AppError) {
            return res
                .status(error.statusCode)
                .json({ errors: { default: error.message } });
        }
        return res.status(500).json({ message: "Erro ao processar verifyAuthenticationUser", context: "auth/controllers/auth.controller.ts/verifyAuthenticationUser" });
    }
};
exports.verifyAuthenticationUser = verifyAuthenticationUser;
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.getUser(email, password);
        return res.status(200).json({ user });
    }
    catch (error) {
        if (error instanceof AppErro_1.AppError) {
            return res
                .status(error.statusCode)
                .json({ errors: { default: error.message } });
        }
        return res.status(500).json({ message: "Erro ao processar signIn", context: "auth/controllers/auth.controller.ts/signIn" });
    }
};
exports.signIn = signIn;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await service.forgotPassword(email);
        return res.status(200).json({ user });
    }
    catch (error) {
        if (error instanceof AppErro_1.AppError) {
            return res
                .status(error.statusCode)
                .json({ errors: { default: error.message } });
        }
        return res.status(500).json({ message: "Erro ao processar forgotPassword", context: "auth/controllers/auth.controller.ts/forgotPassword" });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    const { token } = req.query;
    if (!token || !password || !confirmPassword || typeof token !== "string") {
        return res.status(400).json({ errors: { default: "Todos os campos são necessários" } });
    }
    try {
        const updatedUser = await service.resetPassword(token, password);
        return res.status(200).json({ updatedUser });
    }
    catch (error) {
        if (error instanceof AppErro_1.AppError) {
            return res
                .status(error.statusCode)
                .json({ errors: { default: error.message } });
        }
        return res.status(500).json({ message: "Erro ao processar resetPassword", context: "auth/controllers/auth.controller.ts/resetPassword" });
    }
};
exports.resetPassword = resetPassword;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resertPassword = exports.forgotPassword = exports.sigIn = exports.verifyEmail = exports.signUp = void 0;
const service_auth_1 = require("../services/service.auth");
const service = new service_auth_1.AuthService();
const signUp = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (!name || !email || !password || !confPassword) {
        res.status(400).json({ errors: { default: "Os campos são obrigatorios" } });
        return;
    }
    if (password !== confPassword) {
        res.status(400).json({ errors: { default: "Senhas não coincidem." } });
        return;
    }
    try {
        const user = await service.registerUser({ name, email, password });
        return res.status(201).json(user);
    }
    catch {
        return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};
exports.signUp = signUp;
const verifyEmail = (req, res) => {
    const token = req.cookies["verifyEmail"];
    if (!token) {
        res.status(401).json({ errors: { default: "Token não encotrado." } });
        return;
    }
};
exports.verifyEmail = verifyEmail;
const sigIn = (req, res) => { };
exports.sigIn = sigIn;
const forgotPassword = (req, res) => { };
exports.forgotPassword = forgotPassword;
const resertPassword = (req, res) => { };
exports.resertPassword = resertPassword;

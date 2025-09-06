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
const verifyEmail = async (req, res) => {
    const { user_id, token } = req.query;
    if (!user_id ||
        !token ||
        typeof token !== "string" ||
        typeof user_id !== "string") {
        res
            .status(401)
            .json({ errors: { default: "Token e user_id não são válidos" } });
        return;
    }
    const verification = await service.getByIdTokenVerication(user_id, token);
    if (!verification) {
        res.status(404).json({
            errors: {
                default: "Verificação não encontrada ou já usada",
            },
        });
        return;
    }
    if (new Date() > verification.expires_at) {
        res.status(400).json({
            errors: {
                default: "Token expirado",
            },
        });
        return;
    }
    const uid = verification.user_id;
    if (!uid) {
        res.status(404).json({
            errors: {
                default: "Usuário não encotrado",
            },
        });
        return;
    }
    const updateAuteticationUser = await service.updateAutetication(uid);
    res.status(201).json({ updateAuteticationUser });
};
exports.verifyEmail = verifyEmail;
const sigIn = (req, res) => { };
exports.sigIn = sigIn;
const forgotPassword = (req, res) => { };
exports.forgotPassword = forgotPassword;
const resertPassword = (req, res) => { };
exports.resertPassword = resertPassword;

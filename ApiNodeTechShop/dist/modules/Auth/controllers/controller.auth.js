"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resertPassword = exports.forgotPassword = exports.sigIn = exports.verifyEmail = exports.signUp = void 0;
const service_auth_1 = require("../services/service.auth");
const PasswordCrypto_1 = require("../../../share/services/PasswordCrypto");
const JWTService_1 = require("../../../share/services/JWTService");
const auth_producers_1 = require("../../../messaging/producers/auth.producers");
const service = new service_auth_1.AuthService();
const signUp = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (!name || !email || !password || !confPassword) {
        res.status(400).json({ errors: { default: "Os campos são obrigatorios" } });
        return;
    }
    if (password !== confPassword) {
        res.status(400).json({ errors: {
                default: "Senhas não coincidem."
            } });
        return;
    }
    try {
        await service.getByEmail(email);
        res.status(409).json({ field: "email", message: "Email já existe" });
        return;
    }
    catch {
        const passwordHash = (await PasswordCrypto_1.passwordCrypto.hashPassword(password)).toString();
        const user = await service.createUser({ name, email, passwordHash });
        await (0, auth_producers_1.publishOrderCreated)(user);
        if (!user) {
            res.status(400).json({ errors: {
                    default: "Não foi possível criar o usuário"
                } });
            return;
        }
        const uid = user.id;
        if (uid === undefined) {
            res.status(404).json({ errors: {
                    default: "Id do usuario não encontrado"
                } });
            return;
        }
        const tokenVerication = JWTService_1.JWTService.sign({ scope: uid });
        if (!tokenVerication || tokenVerication === "JWT_SECRET_NOT_FOUND") {
            res.status(500).json({ errors: {
                    default: "Erro ao gera o token"
                } });
            return;
        }
        res.status(200).json({ user });
    }
};
exports.signUp = signUp;
const verifyEmail = (req, res) => {
    const token = req.cookies['verifyEmail'];
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

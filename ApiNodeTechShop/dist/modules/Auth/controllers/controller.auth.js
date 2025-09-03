"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resertPassword = exports.forgotPassword = exports.sigIn = exports.verifyEmail = exports.signUp = void 0;
const service_auth_1 = require("../services/service.auth");
const PasswordCrypto_1 = require("../../../share/services/PasswordCrypto");
const auth_producers_1 = require("../../../messages/producers/auth.producers");
const tokenService = new service_auth_1.AuthTokenService();
const service = new service_auth_1.AuthService();
const signUp = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (!name || !email || !password || !confPassword) {
        res.status(400).json({ errors: { default: "Os campos são obrigatorios" } });
        return;
    }
    if (password !== confPassword) {
        res.status(400).json({
            errors: {
                default: "Senhas não coincidem.",
            },
        });
        return;
    }
    try {
        await service.getByEmail(email);
        res.status(409).json({ field: "email", message: "Email já existe" });
        return;
    }
    catch {
        const passwordHash = (await PasswordCrypto_1.passwordCrypto.hashText(password)).toString();
        const user = await service.createUser({ name, email, passwordHash });
        if (!user) {
            res.status(400).json({
                errors: {
                    default: "Não foi possível criar o usuário",
                },
            });
            return;
        }
        const uid = user.id;
        if (uid === undefined) {
            res.status(404).json({
                errors: {
                    default: "Id do usuario não encontrado",
                },
            });
            return;
        }
        const token = await tokenService.signToken(uid, 15);
        const userToken = await service.createTokenUser(token, 15);
        await (0, auth_producers_1.publishUserCreated)({
            id: uid,
            name: user.name,
            email: user.email,
        });
        await (0, auth_producers_1.publishEmailVerificationRequested)({
            userId: uid,
            email: user.email,
            token: userToken.tokenHash,
            expiresAt: userToken.expiresAt.toISOString()
        });
        res.status(200).json({ id: user.id, email: user.email });
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../../config/env");
const { emialPass, emialUser } = (0, env_1.env)();
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: emialUser,
        pass: emialPass,
    },
});
async function sendEmail(to, subject, html, text) {
    try {
        const info = await transporter.sendMail({
            from: `"Tech Shop" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("📧 E-mail enviado:", info.messageId);
        return info;
    }
    catch (error) {
        console.error("❌ Erro ao enviar e-mail:", error);
        throw new Error("Falha ao enviar e-mail");
    }
}

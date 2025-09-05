"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordEmailTemplate = resetPasswordEmailTemplate;
exports.createContaEmailTemplate = createContaEmailTemplate;
const urlFrontEnd = "";
function resetPasswordEmailTemplate(name, resetLink) {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9fafb;
          margin: 0;
          padding: 20px;
          color: #111827;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        h1 {
          font-size: 20px;
          color: #1f2937;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        a.button {
          display: inline-block;
          padding: 12px 20px;
          margin-top: 20px;
          background-color: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        }
        a.button:hover {
          background-color: #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Redefinição de senha</h1>
        <p>Olá <b>${name}</b>,</p>
        <p>Recebemos uma solicitação para redefinir sua senha. Se foi você, clique no botão abaixo:</p>
        <a href="${urlFrontEnd}${resetLink}" class="button">Redefinir senha</a>
        <p>Se você não solicitou a redefinição, ignore este e-mail. Sua conta permanecerá segura.</p>
        <p style="font-size: 12px; color: #6b7280;">
          Este link expira em 1 hora.
        </p>
      </div>
    </body>
  </html>
  `;
}
function createContaEmailTemplate(name, Link, token) {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9fafb;
          margin: 0;
          padding: 20px;
          color: #111827;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        h1 {
          font-size: 20px;
          color: #1f2937;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        a.button {
          display: inline-block;
          padding: 12px 20px;
          margin-top: 20px;
          background-color: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        }
        a.button:hover {
          background-color: #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <h1>Bem vindo à streamigflix</h1>
        <p>Olá <b>${name}</b>,</p>
        <p>Recebemos uma solicitação para de criação de conta. Se foi você, clique no botão abaixo:</p>
        <a href="${urlFrontEnd}${Link}?token=${token}" class="button">criar conta</a>
        <p>Se você não solicitou a criação de conta, ignore este e-mail. Sua conta permanecerá segura.</p>
        <p style="font-size: 12px; color: #6b7280;">
          Este link expira em 15 minutos.
        </p>
      </div>
    </body>
  </html>
  `;
}

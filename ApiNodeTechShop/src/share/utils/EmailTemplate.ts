import { env } from "../../config/env";

const { urlFrontEnd } = env()

export function resetPasswordEmailTemplate(name: string, resetLink: string) {
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

export function createContaEmailTemplate(link: string, token: string, user_id:string) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background-color: #f3f4f6;
          margin: 0;
          padding: 40px 20px;
          color: #111827;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }
        .header h1 {
          font-size: 22px;
          color: #111827;
          margin: 0;
        }
        .content {
          margin-top: 20px;
        }
        .content p {
          font-size: 15px;
          line-height: 1.7;
          margin: 10px 0;
          color: #374151;
        }
        a.button {
          display: inline-block;
          padding: 14px 28px;
          margin: 25px 0;
          background-color: #2563eb;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 10px;
          font-weight: bold;
          transition: background 0.3s ease;
        }
        a.button:hover {
          background-color: #1e40af;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Tech Shop</h1>
        </div>
        <div class="content">
          <p>Olá,</p>
          <p>Você solicitou a criação de uma conta na <strong>Tech Shop</strong>. Para confirmar e ativar sua conta, clique no botão abaixo:</p>
          <a href="${urlFrontEnd}${link}?token=${token}&user_id=${user_id}" class="button">Ativar Conta</a>
          <p>Se você não fez esta solicitação, pode simplesmente ignorar este e-mail. Sua conta permanecerá segura.</p>
          <p><strong>Importante:</strong> este link expira em <strong>15 minutos</strong>.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Tech Shop. Todos os direitos reservados.</p>
        </div>
      </div>
    </body>
  </html>
  `;
}
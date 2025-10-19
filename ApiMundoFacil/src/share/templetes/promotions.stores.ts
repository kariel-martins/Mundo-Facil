import { env } from "../../config/env"

const { urlFrontEnd } = env()
export function generalPromotionEmailTemplate() {
    
  const PLACEHOLDER_PROMO_LINK = urlFrontEnd;

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
          font-size: 24px;
          color: #ef4444; /* Vermelho para destaque de promoção */
          text-align: center;
          margin-bottom: 20px;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        .cta-button {
          display: block;
          width: fit-content;
          margin: 25px auto;
          padding: 12px 25px;
          background-color: #ef4444; /* Cor do botão para combinar com o título */
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 18px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: background-color 0.3s;
        }
        .cta-button:hover {
          background-color: #dc2626; /* Um vermelho um pouco mais escuro no hover */
        }
        .meta {
          font-size: 14px;
          color: #6b7280;
          text-align: center;
        }
        .highlight {
            color: #ef4444;
            font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚨 Não Perca! Novas Ofertas Disponíveis! 🚨</h1>
        
        <p>Prezado(a) cliente,</p>

        <p>Preparamos uma seleção especial de produtos com <span class="highlight">descontos incríveis</span> na nossa loja!</p>
        
        <p>De itens essenciais a novidades, esta é a sua chance de economizar. Mas corra, as promoções são por tempo limitado!</p>

        <a href="${PLACEHOLDER_PROMO_LINK}" class="cta-button" target="_blank">
          Confira as Promoções Agora!
        </a>

        <p style="text-align: center;">Clique no botão acima e descubra todos os descontos.</p>

        <p style="font-size: 12px; color: #6b7280; margin-top: 30px; text-align: center;">
          Este é um comunicado de ofertas especiais. O link de promoções é um placeholder e deve ser atualizado.
        </p>
        <div class="meta">Aproveite!</div>
      </div>
    </body>
  </html>
  `;
}
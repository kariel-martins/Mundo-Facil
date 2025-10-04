export function storeCreatedEmailTemplate(
  storeName: string,
  image: string, // imagem da loja
) {
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
          font-size: 22px;
          color: #1f2937;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        .store-card {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background-color: #f9fafb;
          text-align: center;
        }
        .store-card img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .store-name {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #111827;
        }
        .product-highlight {
          margin-top: 15px;
          font-size: 16px;
          color: #374151;
        }
        .price {
          font-size: 16px;
          color: #10b981;
          font-weight: bold;
        }
        .meta {
          font-size: 14px;
          color: #6b7280;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Sua loja foi criada com sucesso 🏬🎉</h1>
        <p>Parabéns! A loja <b>${storeName}</b> já está ativa em nossa plataforma.</p>

        <div class="store-card">
          <img src="${image}" alt="Imagem da loja ${storeName}" />
          <div class="store-name">${storeName}</div>
          <div class="meta">Data de criação: ${new Date().toLocaleDateString()}</div>
        </div>

        <p>Agora você pode começar a adicionar mais produtos e alcançar novos clientes 🚀</p>
        <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">
          Este é um e-mail automático. Por favor, não responda.
        </p>
      </div>
    </body>
  </html>
  `;
}

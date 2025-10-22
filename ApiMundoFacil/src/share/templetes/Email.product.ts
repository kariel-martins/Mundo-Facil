export function productCreatedEmailTemplate(
  productName: string,
  productImage: string,
  price: number,
  storeName: string,
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
          font-size: 20px;
          color: #1f2937;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        .product-card {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background-color: #f9fafb;
          text-align: center;
        }
        .product-card img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .product-name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .price {
          font-size: 16px;
          color: #10b981;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .meta {
          font-size: 14px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Novo produto criado com sucesso 🎉</h1>
        <p>O produto abaixo foi criado em sua loja:</p>
        
        <div class="product-card">
          <img src="${productImage}" alt="Imagem do produto ${productName}" />
          <div class="product-name">${productName}</div>
          <div class="price">R$ ${Number(price).toFixed(2)}</div>
          <div class="meta">Loja: <b>${storeName}</b></div>
          <div class="meta">Data de criação: ${new Date().getFullYear}</div>
        </div>

        <p>Agora ele já está disponível em sua loja para os clientes visualizarem.</p>
        <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">
          Este é um e-mail automático. Por favor, não responda.
        </p>
      </div>
    </body>
  </html>
  `;
}

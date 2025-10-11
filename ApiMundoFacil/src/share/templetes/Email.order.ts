type OrderItemsEmail = {
  productImage: string,
  productName: string,
  price: string 
}
export function orderCreatedEmailTemplate(
  orders: OrderItemsEmail[]
) {

  const orderItemsHTML = orders.map((item) => {
    return `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 15px 0 15px 0; width: 80px;">
          <img src="${item.productImage}" alt="Imagem do produto ${item.productName}" width="60" style="display: block; border-radius: 6px; max-width: 60px; height: auto;">
        </td>
        <td style="padding: 15px 10px 15px 10px; color: #1f2937; font-size: 16px; font-weight: 600;">
          ${item.productName}
        </td>
        <td style="padding: 15px 0 15px 10px; text-align: right; color: #10b981; font-size: 16px; font-weight: 700;">
          ${item.price}
        </td>
      </tr>
      `;
  }).join(''); 
  
  const creationDate = new Date().toLocaleDateString('pt-BR');

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Seu Pedido Foi Criado!</title>
        <style>
          /* Estilos globais e Reset */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6; /* Fundo mais suave */
            color: #111827;
          }
          /* Media Query para Responsividade em dispositivos móveis */
          @media screen and (max-width: 600px) {
            .container-table {
              width: 100% !important;
            }
            .header-content h1 {
              font-size: 18px !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
        <center>
        
          <table class="container-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 30px auto; background: white; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <tr>
              <td style="padding: 30px;">
              
                <div class="header-content" style="text-align: center; margin-bottom: 25px;">
                  <h1 style="margin: 0 0 10px 0; font-size: 24px; color: #1f2937;">
                    Novo pedido feito com sucesso 🎉
                  </h1>
                  <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4b5563;">
                    Obrigado! Aqui está o resumo dos seus produtos.
                  </p>
                </div>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-top: 20px;">
                  <tr style="border-bottom: 2px solid #e5e7eb;">
                    <td colspan="2" style="padding-bottom: 10px; font-size: 14px; font-weight: 600; color: #6b7280;">Produto</td>
                    <td style="padding-bottom: 10px; text-align: right; font-size: 14px; font-weight: 600; color: #6b7280;">Valor</td>
                  </tr>
                  
                  ${orderItemsHTML}
                </table>
                
                <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed #e5e7eb;">
                  <p style="margin: 0 0 5px 0; font-size: 15px; color: #4b5563; text-align: right;">
                    Data de criação: <b>${creationDate}</b>
                  </p>
                  <p style="margin: 15px 0 0 0; font-size: 14px; line-height: 1.5; color: #6b7280;">
                    <a href="#" style="color: #4f46e5; text-decoration: none; font-weight: 600;">Clique aqui para acompanhar seu pedido</a> em sua conta.
                  </p>
                </div>
                
                <p style="font-size: 12px; color: #9ca3af; margin-top: 30px; text-align: center;">
                  Este é um e-mail automático. Por favor, não responda.
                </p>
                
              </td>
            </tr>
          </table>
          
        </center>
      </body>
    </html>
  `;
}
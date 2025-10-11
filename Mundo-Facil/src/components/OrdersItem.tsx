import { getAllItemsMutateOrders } from "@/hooks/orders/mutations/orders.mutate";

export function Orderitems({ order_id }: { order_id: string }) {
  const { data: orderItems } = getAllItemsMutateOrders(order_id);

  console.log(orderItems)
  return (
    <div className="mt-3 pt-3 border-t border-gray-100/70">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">Itens do Pedido:</h3>
      
      {/* Container de Itens - Usando um Grid/Flex para responsividade */}
      <div className="space-y-3">
        {orderItems?.map((item) => (
          <div 
            key={item.order_items?.id} 
            className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg border border-gray-100"
          >
            {item.products && (
              <>
                {/* Imagem do Produto */}
                <img 
                  src={item.products.image} 
                  alt={item.products.productName} 
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-gray-200"
                />
                
                {/* Detalhes do Produto */}
                <div className="flex-grow">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">
                    {item.products.productName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qtd: <span className="font-semibold text-gray-600">{item.order_items?.quantity}</span>
                  </p>
                </div>
                
                {/* Preço Unitário */}
                <p className="text-sm font-extrabold text-blue-500 flex-shrink-0">
                  R$ {Number(item.products.price).toFixed(2)}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
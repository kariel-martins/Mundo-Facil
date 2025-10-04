export type CartRequest = {
  carts: {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    created_at: Date;
  };
  products: {
    id: string;
    store_id: string;
    productName: string;
    category: string;
    discount: number;
    rating: number;
    price: number;
    description: string;
    priceOrigin: number;
    estoque: number;
    image: string;
    created_at: string;
  };
};

export type CartResponce = {
  user_id: string;
  product_id: string;
  quantity: number;
};

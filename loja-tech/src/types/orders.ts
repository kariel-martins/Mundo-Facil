export type OrderResponce = {
  orders: {
    id: string;
    user_id: string;
    store_id: string;
    product_id: string;
    status: string;
    quantity: number;
    created_at: Date;
  };
  products: {
    id: string;
    store_id: string;
    productName: string;
    category: string;
    discount: number | null;
    rating: number | null;
    price: number;
    description: string | null;
    priceOrigin: number | null;
    estoque: number;
    image: string;
    created_at: Date;
  };
};
export type OrderRequest = {
  user_id: string;
  store_id: string;
  product_id: string;
  status: string;
  quantity: number;
};

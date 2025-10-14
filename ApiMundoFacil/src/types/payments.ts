export type CreatePaymentType = {
  user_id: string;
  status: string;
  total: string;
  carts: [
    {
      carts: {
        user_id: string;
        product_id: string;
        id?: string | undefined;
        created_at?: Date | undefined;
        quantity?: number | undefined;
      };
      products: {
        store_id: string;
        productName: string;
        category: string;
        price: string;
        image: string;
        id?: string | undefined;
        created_at?: Date | undefined;
        rating?: number | null | undefined;
        description?: string | null | undefined;
        estoque?: number | undefined;
      };
    }
  ];
};

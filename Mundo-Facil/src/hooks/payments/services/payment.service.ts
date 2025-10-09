import { axiosInstance } from "@/lib/axios";
import type { OrderRequest } from "@/types/orders";

export async function paymentService(data: OrderRequest) {
    const result = await axiosInstance.post("/payments/create-session", data)
    return result.data
}
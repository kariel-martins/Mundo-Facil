import { axiosInstance } from "@/lib/axios";
import type { StoreData } from "@/types/store";
import type { StoreDataForm } from "../dtos/store.schemas";

type CreateProductProps = StoreDataForm & { user_id: string }
type UpdateProductProps = StoreDataForm & { store_id: string }

export class StoreService {
  public async getAll(user_id: string): Promise<StoreData[]> {
    const result  = await axiosInstance.get(`/stores/${user_id}`);
    return result.data;
  }
  public async create(variables: CreateProductProps): 
  Promise<StoreData> {
    const { user_id, ...data } = variables
    const result = await axiosInstance.post(`/stores/${user_id}`, data);
    return result.data;
  }

  public async update(variables: UpdateProductProps): Promise<StoreData> {
    const {store_id, ...data} = variables;
    const result = await axiosInstance.put(`/stores/${store_id}`, data);
    return result.data;
  }

  public async remove(store_id: string): Promise<StoreData> {
    const result = await axiosInstance.delete(`/stores/${store_id}`);
    return result.data;
  }
}

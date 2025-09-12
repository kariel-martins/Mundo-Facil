import { AppError } from "../../../errors/AppErro";
import { publishCreatedStoreRequest } from "../../../messages/producers/store.producers";
import { StoreInsert } from "../dtos/store.types.store.dto";
import { StoreRepository } from "../repositories/store.repository";

export class StoreService {
  private repo = new StoreRepository();
  // helper para padronizar tratamento de erros
  private async execute<T>(
    fn: () => Promise<T>,
    message: string,
    context: string
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      console.error(`Erro em ${context}:`, error);
      if (error instanceof AppError) throw error;
      throw new AppError(message, 500, context);
    }
  }

  public async create(data: StoreInsert, image: string): Promise<StoreInsert> {
    return this.execute(
      async () => {
        try {
          const existing = await this.repo.getStore(data.email, data.storeName);
          if (existing) throw new AppError("Já existe loja cadastrada", 409);
        } catch {}
       
        const store = await this.repo.create(data);
        if (!store) throw new AppError("Não foi possível criar a loja", 404);

        await publishCreatedStoreRequest({storeName: store.storeName, image: image, email: store.email})
        return store;
      },"Erro ao criar a loja", "stores/services/store.service.ts/registerStore"
    );
  }

  public async getById(store_id: string): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const store = await this.repo.getById(store_id);
        if (!store) throw new AppError("Loja não encontrada", 409);
        return store;
      },"Erro ao buscar pela loja", "stores/services/store.service.ts/getStoreById"
    );
  }

  public async getAll(): Promise<StoreInsert[]> {
    return this.execute(
      async () => {
        const store = await this.repo.getAll();
        if (!store || store.length === 0) throw new AppError("Não lojas cadastradas", 409);
        return store;
      },"Erro ao buscar pela loja", "stores/services/store.service.ts/getStoreById"
    );
  }

  public async update(
    store_id: string,
    data: StoreInsert
  ): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const store = await this.repo.update(store_id, data);
        if (!store)
          throw new AppError("Não foi possível atualizar a loja", 404);
        return store;
      },"Erro ao atualizar a loja","stores/services/store.service.ts/updateStore"
    );
  }

  public async delete(store_id: string): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const store = await this.repo.delete(store_id);
        if (!store) throw new AppError("Não foi possível deletar a loja", 404);
        return store;
      },"Erro ao deletar a loja","stores/services/store.service.ts/deleteStore"
    );
  }
}

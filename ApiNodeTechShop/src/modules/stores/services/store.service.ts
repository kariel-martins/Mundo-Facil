import { AppError } from "../../../errors/AppErro";
import { JWTService } from "../../../share/services/JWTService";
import { StoreInsert } from "../dtos/types.store.dto";
import { StoreRepository } from "../repositories/store.repository";

export class AuthService {
  private repo = new StoreRepository();
  private tokenService = new JWTService();

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

  public async registerStore(data: StoreInsert): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const existing = await this.repo.getStore(data.email, data.storeName);
        if (existing) throw new AppError("Já existe loja cadastrada", 409);
        const auth = await this.repo.create(data);
        if (!auth) throw new AppError("Erro ao criar loja", 400);

        return auth;
      },
      "Não foi possível criar a loja",
      "stores/services/store.service.ts/registerStore"
    );
  }
}

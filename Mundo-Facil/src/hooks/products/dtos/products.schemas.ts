import { z } from "zod";

export const productsSchema = z.object({
  productName: z.string().min(1, "Nome obrigatório"),
  category: z.string().min(1, "A Categoria é obrigatória"), 
  price: z.coerce.number("Deve ser um numero").min(1, "Preço deve ser maior que 0"),
  description: z.string().min(1, "Descrição obrigatória"),
  estoque: z.coerce.number("Deve ser um numero").int().min(0, "Estoque não pode ser negativo"),
  image: z.string().url("URL da imagem inválida"),
});

export type ProductDataForm = z.infer<typeof productsSchema>;

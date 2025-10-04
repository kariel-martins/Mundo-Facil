import { constValidation } from "@/share/utils/constSchemasvalidate";
import { z } from "zod";

export const StoreSchema = z.object({
  storeName: z.string(),
  email: constValidation.email,
  image: constValidation.url
});

export type StoreDataForm = z.infer<typeof StoreSchema>;

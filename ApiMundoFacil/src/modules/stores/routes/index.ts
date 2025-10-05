import { Router } from "express";
import { validateStoreSchemaAll, validateStoreSchemaById, validateStoreSchemaRegister, validateStoreSchemaUpdate } from "../dtos/store.schema.dto";
import { deleteStore, getAllStore, getStore, createStore, updateStore } from "../controllers/store.controller";
import { Autorization } from "../../../share/middleware/autentication";

const StoreRouter = Router()

StoreRouter.get("/:boss_id", Autorization,validateStoreSchemaAll, getAllStore)
StoreRouter.post("/:boss_id", Autorization,validateStoreSchemaRegister, createStore)
StoreRouter.put("/:store_id", Autorization,validateStoreSchemaUpdate, updateStore)
StoreRouter.delete("/:store_id", Autorization,validateStoreSchemaById, deleteStore)

export { StoreRouter }
          
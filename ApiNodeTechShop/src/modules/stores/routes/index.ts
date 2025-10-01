import { Router } from "express";
import { validateStoreSchemaAll, validateStoreSchemaById, validateStoreSchemaRegister, validateStoreSchemaUpdate } from "../dtos/store.schema.dto";
import { deleteStore, getAllStore, getStore, createStore, updateStore } from "../controllers/store.controller";

const StoreRouter = Router()

StoreRouter.get("/:boss_id", validateStoreSchemaAll, getAllStore)
StoreRouter.post("/:boss_id", validateStoreSchemaRegister, createStore)
StoreRouter.put("/:store_id", validateStoreSchemaUpdate, updateStore)
StoreRouter.delete("/:store_id", validateStoreSchemaById, deleteStore)

export { StoreRouter }
          
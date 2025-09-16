import { Router } from "express";
import { validateStoreSchemaById, validateStoreSchemaRegister, validateStoreSchemaUpdate } from "../dtos/store.schema.dto";
import { deleteStore, getAllStore, getStore, createStore, updateStore } from "../controllers/store.controller";

const StoreRouter = Router()

StoreRouter.post("/:boss_id", validateStoreSchemaRegister, createStore)
StoreRouter.get("/:store_id", validateStoreSchemaById, getStore)
StoreRouter.get("/", getAllStore)
StoreRouter.put("/:store_id", validateStoreSchemaUpdate, updateStore)
StoreRouter.delete("/:store_id", validateStoreSchemaById, deleteStore)


export { StoreRouter }
          
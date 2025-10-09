import { Router } from "express";
import { validateStoreSchemaAll, validateStoreSchemaById, validateStoreSchemaRegister, validateStoreSchemaUpdate } from "../dtos/store.schema.dto";
import { deleteStore, getAllStore, getStore, createStore, updateStore } from "../controllers/store.controller";
import { Authorization } from "../../../share/middleware/autentication";

const StoreRouter = Router()

StoreRouter.get("/:boss_id", Authorization,validateStoreSchemaAll, getAllStore)
StoreRouter.post("/:boss_id", Authorization,validateStoreSchemaRegister, createStore)
StoreRouter.put("/:store_id", Authorization,validateStoreSchemaUpdate, updateStore)
StoreRouter.delete("/:store_id", Authorization,validateStoreSchemaById, deleteStore)

export { StoreRouter }
          
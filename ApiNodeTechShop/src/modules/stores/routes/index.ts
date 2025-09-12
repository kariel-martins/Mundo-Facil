import { Router } from "express";
import { validateStoreById, validateStoreRegister } from "../dtos/store.schema.dto";
import { deleteStore, getAllStore, getStore, createStore, updateStore } from "../controllers/store.controller";

const StoreRouter = Router()

StoreRouter.post("/:boss_id", validateStoreRegister, createStore)
StoreRouter.get("/:store_id", validateStoreById, getStore)
StoreRouter.get("/", getAllStore)
StoreRouter.put("/:store_id", validateStoreById, updateStore)
StoreRouter.delete("/:store_id", validateStoreById, deleteStore)


export { StoreRouter }
          
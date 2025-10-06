import express from "express";


// Usar somente na rota de webhook
export const rawBodyMiddleware = express.raw({ type: "application/json" });
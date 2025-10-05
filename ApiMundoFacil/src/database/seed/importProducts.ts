
import { db } from "../client.database"; 
import { products } from "../schema.database";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("src/database/seed/produtos.json", "utf-8"));

async function seed() {
  try {
    await db.insert(products).values(data);
    console.log("Produtos importados com sucesso!");
  } catch (err) {
    console.error("Erro ao importar produtos:", err);
  }
}

seed();

import { env } from "./config/env"
import { app } from "./app";
import dotenv from "dotenv"
dotenv.config()

const dataEnv = env()


app.listen(dataEnv.port, ()=> {
    console.log("servido rodando!!!")
})
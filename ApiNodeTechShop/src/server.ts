import { env } from "./config/env"
import { app } from "./app";

const dataEnv = env()


app.listen(dataEnv.port, ()=> {
    console.log("servido rodando!!!")
})
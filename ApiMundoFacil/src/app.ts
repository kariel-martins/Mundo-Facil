import express from "express"
import { router } from "./route";
import { Counter, register } from "prom-client"
import cors from "cors"
import {env} from "./config/env"
import { webhookRouter } from "./modules/payments/controllers/payment.controller.webhook";

const app = express();
const { urlFrontEnd } = env()
const requestCounter = new Counter({
    name: 'http_request_total',
    help: 'Total de requisições HTTP recebidas',
})

app.use(cors({
  origin: urlFrontEnd,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
   credentials: true     
}));

app.use("/api/payments",webhookRouter)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
  requestCounter.inc();
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


app.use(router)

export { app }
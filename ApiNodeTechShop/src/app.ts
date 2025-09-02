import express from "express"
import { router } from "./route";
import { Counter, register } from "prom-client"

const app = express();

const requestCounter = new Counter({
    name: 'http_request_total',
    help: 'Total de requisições HTTP recebidas',
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
  requestCounter.inc();
  next();
});
// Endpoint para Prometheus coletar as métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});


app.use(router)

export { app }
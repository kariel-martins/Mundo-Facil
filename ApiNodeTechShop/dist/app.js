"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const route_1 = require("./route");
const prom_client_1 = require("prom-client");
const app = (0, express_1.default)();
exports.app = app;
const requestCounter = new prom_client_1.Counter({
    name: 'http_request_total',
    help: 'Total de requisições HTTP recebidas',
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    requestCounter.inc();
    next();
});
// Endpoint para Prometheus coletar as métricas
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', prom_client_1.register.contentType);
    res.end(await prom_client_1.register.metrics());
});
app.use(route_1.router);

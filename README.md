# Mundo Fácil

> Monorepo para a plataforma Mundo Fácil — aplicação de e-commerce com API (Node/TypeScript) e frontend (React + Vite).

## Descrição

Este repositório contém o backend (`ApiMundoFacil`) e o frontend (`Mundo-Facil`) de uma plataforma de comércio eletrônico. O backend provê APIs REST, jobs agendados, integração com Redis e RabbitMQ, e scripts de migração/seed (Drizzle). O frontend é uma SPA em React com Vite que consome as APIs para autenticação, catálogo, carrinho e checkout.

## Estrutura principal

- `ApiMundoFacil/` – backend em Node + TypeScript (APIs, jobs, mensagens, DB)
- `Mundo-Facil/` – frontend em React + TypeScript (Vite)
- `docker-compose.yml` – orquestração de serviços (api, frontend, redis, rabbitmq, prometheus, grafana...)
- `prometheus/`, `grafana/` – configurações de observabilidade

## Tecnologias

- Node.js, TypeScript
- Express (ou framework HTTP equivalente no backend)
- Drizzle (migrations / schema)
- Redis, RabbitMQ
- React, Vite, TypeScript no frontend
- Docker / docker-compose
- Prometheus, Grafana para métricas

## Requisitos

- Node.js (>= 18 recomendado)
- npm ou yarn
- Docker & Docker Compose (opcional, api completa)

## Instalação e uso (rápido)

Siga estes passos para rodar localmente (modo de desenvolvimento):

1) Backend (ApiMundoFacil)

Abra um terminal no diretório `ApiMundoFacil` e rode:

```powershell
cd ApiMundoFacil
npm install
# configurar .env com variáveis necessárias (ex: DATABASE_URL, REDIS_URL, RABBITMQ_URL, JWT_SECRET)
npm run dev
```

2) Frontend (Mundo-Facil)

Abra outro terminal no diretório `Mundo-Facil` e rode:

```powershell
cd Mundo-Facil
npm install
npm run dev
```

3) Executar com Docker Compose (opção completa)

```powershell
docker-compose up --build
```

Isso irá trazer os serviços (api, redis, rabbitmq, Prometheus e grafama) conforme o `docker-compose.yml`.

## Variáveis de ambiente (exemplos)

- DATABASE_URL=postgres://user:pass@host:5432/dbname
- REDIS_URL=redis://localhost:6379
- RABBITMQ_URL=amqp://guest:guest@localhost:5672
- JWT_SECRET=uma_chave_secreta

(Verifique `ApiMundoFacil/src/config/env.ts` para a lista completa e nomes exatos.)

## Exemplos práticos

- Listar produtos (exemplo CURL):

```powershell
curl http://localhost:3000/products
```

- Autenticar (exemplo):

```powershell
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"senha"}'
```

No frontend, o cliente Axios está em `Mundo-Facil/src/lib/axios.ts` e já possui interceptors para o token.

## Como contribuir

1. Faça um fork e crie uma branch com a feature/bugfix: `feature/nome-da-feature`.
2. Abra um PR com descrição clara do que mudou e por quê.
3. Inclua testes quando aplicável e atualize a documentação.

Para contribuições locais, mantenha os padrões de lint/format do projeto.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` (se existir) ou adicione o arquivo de licença apropriado.

## Autor

- kariel-martins

---

Se quiser, eu posso:
- adaptar o README para cada subprojeto (`ApiMundoFacil/README.md` e `Mundo-Facil/README.md`),
- incluir um guia de execução com exemplos mais detalhados (migrations, seeds),
- ou gerar um arquivo `COMMIT_MESSAGE.md` com o texto de commit que criei anteriormente.

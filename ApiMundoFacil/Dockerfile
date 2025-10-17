# Usa uma imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# compila para pasta dist
RUN npm run build

# Expõe a porta que sua API usa
EXPOSE 5050

# Comando para iniciar a API
CMD ["npm","run", "start:prod"]

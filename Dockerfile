# Etapa 1: Construção
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia o código da aplicação
COPY . .

# Adiciona a configuração para desabilitar SWC e usar Babel
RUN echo '{ "swcMinify": false }' > .babelrc

# Compila a aplicação Next.js com Babel
ENV NODE_ENV=production
RUN npm run build

# Etapa 2: Produção
FROM node:18-slim AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia o código compilado da etapa de construção
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules

# Copia arquivos de configuração necessários
COPY --from=build /app/next.config.js ./

# Copia o arquivo .env se existir
COPY --from=build /app/.env* ./

# Expõe a porta 3016 (conforme seu package.json)
EXPOSE 3016

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "start"]
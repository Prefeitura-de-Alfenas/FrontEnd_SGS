# Etapa 1: Construção
FROM node:18-alpine AS build

# Instala dependências necessárias para o SWC
RUN apk add --no-cache libc6-compat

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia o código da aplicação
COPY . .

# Se você estiver usando Prisma (descomente se necessário)
# RUN npx prisma generate

# Compila a aplicação Next.js
RUN npm run build

# Etapa 2: Produção
FROM node:18-alpine AS production

# Instala dependências necessárias para execução
RUN apk add --no-cache libc6-compat

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm install --production

# Copia o código compilado da etapa de construção
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules

# Copia arquivos de configuração necessários
COPY next.config.js ./

# Copia o arquivo .env se existir
COPY .env* ./

# Expõe a porta 3016 (conforme seu package.json)
EXPOSE 3016

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "start"]
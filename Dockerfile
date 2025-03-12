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

# Se você estiver usando Prisma (como no exemplo anterior)
# RUN npx prisma generate

# Compila a aplicação Next.js
RUN npm run build

# Etapa 2: Produção
FROM node:18 AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia o código compilado da etapa de construção
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules

# Se você estiver usando Prisma
# COPY --from=build /app/prisma /app/prisma

# Copia o arquivo next.config.js
COPY next.config.js ./

# Copia o arquivo .env se existir
COPY .env* ./

# Expõe a porta 3000 (porta padrão do Next.js)
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "start"]

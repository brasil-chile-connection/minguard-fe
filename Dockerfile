# FROM node:18-alpine

# WORKDIR /usr/src/app

# COPY package*.json /usr/src/app

# RUN npm install

# COPY . /usr/src/app

# CMD npm start
# Etapa 1: Construção da aplicação (build)
FROM node:18-alpine AS build

WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para instalar as dependências
COPY package*.json /usr/src/app/

RUN npm install

# Copiar o código-fonte
COPY . /usr/src/app/

# Gerar a build otimizada para produção
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:alpine

# Copiar os arquivos da build para o diretório do Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expor a porta 80 para acesso ao app
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

# build da aplicação React + TS (CRA)
FROM node:20-alpine AS builder

WORKDIR /app

# copia os arquivos de dependência
COPY app/package*.json ./

# instala dependências
RUN npm install

# copia todo o conteúdo da pasta app
COPY app/. .

# compila o projeto
RUN npm run build

# via Nginx
FROM nginx:alpine

# create React App gera a pasta 'build'
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Dockerfile

# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos do package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do projeto para o diretório de trabalho
COPY . .

# Exponha a porta padrão do Vite (geralmente é 5173)
EXPOSE 5173

# Comando padrão para iniciar o Vite
CMD npm run dev -- --host

FROM node:12
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 5000
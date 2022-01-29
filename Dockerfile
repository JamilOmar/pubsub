FROM node:16

# Create app directory
WORKDIR /code
RUN mkdir -p /code/input/logs
RUN mkdir -p /code/output/logs 
COPY src ./src
COPY tsconfig.json ./
COPY package*.json ./

RUN npm install
RUN npm run build

CMD [ "node", "dist/index.js" ]
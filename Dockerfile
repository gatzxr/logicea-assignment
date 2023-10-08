FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV REACT_APP_API_URL=https://retoolapi.dev/vcv4zy/

CMD ["npm", "start"]
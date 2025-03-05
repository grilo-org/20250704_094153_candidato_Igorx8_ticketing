FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install 
# --omit=dev place that flag on production
COPY . .

CMD ["npm", "start"]
FROM node:alpine

WORKDIR /app

# COPY
COPY . .

RUN npm install

RUN npx prisma generate

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npm start
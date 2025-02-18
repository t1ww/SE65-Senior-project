# Use a small Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your project files
COPY . .

# Start the server using ts-node to run server.ts
CMD ["npx", "ts-node", "server.ts"]

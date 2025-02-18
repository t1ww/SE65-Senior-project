# Use a small Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install ts-node and typescript globally inside the container
RUN npm install -g ts-node typescript

# Copy the rest of your project files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the server using ts-node to run server.ts
CMD ["npx", "ts-node", "--loader", "ts-node/esm", "server.ts"]

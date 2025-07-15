FROM node:18

# Install g++ compiler and any needed build tools
RUN apt-get update && apt-get install -y g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Start server using ts-node with esm loader
CMD ["node", "--loader", "ts-node/esm", "server.ts"]

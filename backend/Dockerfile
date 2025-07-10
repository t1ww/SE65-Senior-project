# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port (commonly 3000 or 8080 for Express)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

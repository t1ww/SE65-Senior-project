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

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]

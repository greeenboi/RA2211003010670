
# Use the official Bun image
FROM oven/bun:latest AS build

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb (if it exists)
COPY package.json ./
COPY bun.lockb ./
# COPY .env ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application in development mode
CMD ["bun", "run", "dev"]
# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Copy and setup environment variables
COPY app/config/config.json.example app/config/config.json
COPY .env.example .env.development

# Install wait-for-it script
RUN apt-get update && apt-get install -y wait-for-it

# Expose the port your app runs on
EXPOSE 3000

# Run migrations after DB ready
CMD ["sh", "-c", "npm install -g sequelize-cli && cd app && wait-for-it db:5432 -- npx runmigration && npm run dev"]

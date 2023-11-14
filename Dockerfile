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

# Replace this line with the actual commands to fill in the environment variables if required

# Expose the port your app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "run", "dev"]


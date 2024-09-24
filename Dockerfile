FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force
RUN npm install

# Copy the source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]


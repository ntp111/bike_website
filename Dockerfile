FROM node:20

# Set the working directory
WORKDIR /usr/src/app


# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install


COPY . .

# Expose the app port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Install build tools before installing dependencies
RUN apt-get update && apt-get install -y build-essential python

# Set npm config to use prebuilt binaries (before npm install)
ENV npm_config_build_from_source=false

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Rebuild sqlite3 from source if necessary
RUN npm rebuild sqlite3 --build-from-source

# Copy the source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

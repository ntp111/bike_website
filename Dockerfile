FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Install build tools and python3 for compiling native modules
RUN apt-get update && apt-get install -y build-essential python3 python3-pip

# Set npm config to use prebuilt binaries if possible
ENV npm_config_build_from_source=false

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild sqlite3 from source (only if necessary for your environment)
RUN npm rebuild sqlite3 --build-from-source

# Copy the rest of the application files
COPY . .

# Expose the app port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

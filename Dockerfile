FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# RUN node -v
# RUN npm list sqlite3
RUN npm rebuild sqlite3 --build-from-source


# Copy the source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]


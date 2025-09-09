FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["yarn", "start:dev"]

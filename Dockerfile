FROM node:10.16.3-slim

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . .

# Install app dependencies
# RUN yarn install

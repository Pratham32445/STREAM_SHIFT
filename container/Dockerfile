# Use an official Node.js runtime as a parent image
FROM ubuntu:focal

# Update package lists and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y ffmpeg \
    && apt-get install -y gnupg2

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install -y nodejs

# Set the working directory in the container
WORKDIR /app

# Install AWS SDK for JavaScript and dotenv using npm
RUN npm install @aws-sdk/client-s3 dotenv redis

# Copy main.sh and script.js into the container
COPY main.sh /app/main.sh
COPY script.js /app/script.js
COPY .env /app/.env

# Make main.sh executable
RUN chmod +x /app/main.sh

# Set the entrypoint to main.sh
ENTRYPOINT ["/app/main.sh"]
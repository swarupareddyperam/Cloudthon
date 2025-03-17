FROM node:23.10.0
RUN npm install -g npm@10.9.2
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
ENV GOOGLE_APPLICATION_CREDENTIALS="./keys/serviceaccount.json"
# Install dependencies
RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
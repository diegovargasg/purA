# Specify base image
FROM node:16.13.0
WORKDIR "/app"

# Install dependencies
COPY ./package.json ./
RUN npm install
COPY . .

# Default command
CMD ["npm", "run", "start"]

EXPOSE 4200
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install Angular CLI globally and dependencies
RUN npm install -g @angular/cli@20 && npm install

# Copy rest of project
COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]

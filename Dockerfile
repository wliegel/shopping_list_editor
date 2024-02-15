# Stage 1: Build the Angular Application
FROM node:18-alpine as build-app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the Angular Application with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-app /app/dist/shopping-list-editor/browser/ /usr/share/nginx/html
EXPOSE 80

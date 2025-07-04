# Stage 1: Build the Angular app
FROM node:16-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

FROM nginx:alpine

COPY --from=build-stage /app/dist/student-system /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

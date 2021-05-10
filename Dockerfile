# build environment
# FROM node:13.12.0-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json ./
# RUN yarn install
# # RUN npm install react-scripts@3.4.1 -g --silent
# COPY . ./
# RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  
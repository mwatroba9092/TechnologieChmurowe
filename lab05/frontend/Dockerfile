# --- ETAP 1: deps ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# --- ETAP 2: build ---
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- ETAP 3: production ---
FROM nginx:alpine AS production

RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

USER nginx

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
# --- ETAP 1: deps ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# --- ETAP 2: production ---
FROM node:18-alpine AS production
WORKDIR /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "server.js"]
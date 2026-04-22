# --- ETAP 1: deps ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# --- ETAP 2: tests ---
FROM deps AS test
COPY package*.json ./

RUN npm install --production=false
COPY . .

RUN npm test

# --- ETAP 3: production ---
FROM node:18-alpine AS production

ARG BUILD_DATE
ARG VERSION
ARG NODE_ENV=production

LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.version=$VERSION \
      org.opencontainers.image.title="Dashboard Backend"

ENV NODE_ENV=$NODE_ENV

WORKDIR /app
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
EXPOSE 3000
CMD ["node", "server.js"]
# ============================================
# ÉTAPE 1: Build du Frontend React
# ============================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copier les fichiers package.json du frontend
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier tout le code source du frontend
COPY . .

# Build du frontend React
RUN npm run build

# ============================================
# ÉTAPE 2: Build du Backend Node.js
# ============================================
FROM node:20-alpine AS backend-builder

WORKDIR /app/server

# Copier les fichiers package.json du backend
COPY server/package.json server/package-lock.json ./

# Installer les dépendances (incluant bcrypt qui nécessite compilation)
RUN apk add --no-cache python3 make g++ && \
    npm ci --only=production && \
    apk del python3 make g++

# ============================================
# ÉTAPE 3: Image finale de production
# ============================================
FROM node:20-alpine

# Installer curl et wget pour les healthchecks
RUN apk add --no-cache curl wget

WORKDIR /app

# Copier le backend compilé
COPY --from=backend-builder /app/server/node_modules ./server/node_modules
COPY server/index.js ./server/

# Copier le frontend build dans dist/
COPY --from=frontend-builder /app/dist ./dist

# Créer les dossiers nécessaires
RUN mkdir -p /app/uploads /app/logs && \
    chown -R node:node /app

# Utiliser l'utilisateur non-root
USER node

# Exposer le port
EXPOSE 3001

# Variables d'environnement par défaut
ENV NODE_ENV=production \
    PORT=3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Démarrer l'application
WORKDIR /app/server
CMD ["node", "index.js"]

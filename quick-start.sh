#!/bin/bash

# ============================================
# QUICK START - GROUPE NOVITEC
# ============================================
# Script de démarrage rapide pour développement local

set -e

echo "🚀 Démarrage rapide de Groupe Novitec (Docker)"
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé!"
    echo "👉 Installez Docker avec: ./install-docker.sh"
    exit 1
fi

# Vérifier si .env existe
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env depuis .env.example..."
    cp .env.example .env

    # Générer des secrets pour le développement local
    DB_PASSWORD=$(openssl rand -base64 16 | tr -d "=+/")
    REDIS_PASSWORD=$(openssl rand -base64 16 | tr -d "=+/")
    JWT_SECRET=$(openssl rand -hex 32)

    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env
    sed -i "s/REDIS_PASSWORD=.*/REDIS_PASSWORD=$REDIS_PASSWORD/" .env
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env

    echo "✅ Fichier .env créé avec des secrets aléatoires"
fi

# Vérifier si les conteneurs existent déjà
if docker compose ps -q | grep -q .; then
    echo "🔄 Redémarrage des conteneurs existants..."
    docker compose restart
else
    echo "🏗️  Build et démarrage des conteneurs..."
    docker compose up -d --build
fi

echo ""
echo "⏳ Attente du démarrage des services..."
sleep 5

echo ""
echo "✅ Services démarrés!"
echo ""

# Obtenir l'IP locale
if command -v ip &> /dev/null; then
    LOCAL_IP=$(ip route get 1 | awk '{print $7; exit}')
else
    LOCAL_IP="localhost"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 INTERFACES DISPONIBLES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Application Groupe Novitec"
echo "   http://$LOCAL_IP"
echo "   Admin: http://$LOCAL_IP/#/admin/login"
echo ""
echo "📦 Portainer (Gestion Docker)"
echo "   http://$LOCAL_IP:9000"
echo ""
echo "🔧 Nginx Proxy Manager"
echo "   http://$LOCAL_IP:81"
echo "   Email: admin@example.com"
echo "   Password: changeme"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 COMMANDES UTILES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Voir les logs:        docker compose logs -f"
echo "  Voir l'état:          docker compose ps"
echo "  Arrêter:              docker compose down"
echo "  Redémarrer:           docker compose restart"
echo "  Maintenance:          ./maintenance.sh"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Afficher les logs pendant 5 secondes
echo "📋 Logs des 5 dernières secondes:"
timeout 5 docker compose logs --tail=20 -f || true

echo ""
echo "✨ Tout est prêt! Bon développement!"

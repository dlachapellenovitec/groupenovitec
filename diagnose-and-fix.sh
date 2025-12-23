#!/bin/bash

# Script de diagnostic et correction Docker

echo "🔍 DIAGNOSTIC DOCKER - GROUPE NOVITEC"
echo "====================================="
echo ""

cd ~/groupenovitec || exit 1

echo "1️⃣ Vérification du Dockerfile..."
echo ""

LINE_12=$(sed -n '12p' Dockerfile)
echo "Ligne 12 du Dockerfile: $LINE_12"
echo ""

if echo "$LINE_12" | grep -q "npm ci --only=production"; then
    echo "❌ PROBLÈME DÉTECTÉ: Le Dockerfile contient encore 'npm ci --only=production'"
    echo ""
    echo "🔧 CORRECTION EN COURS..."
    echo ""

    # Reset hard sur la branche distante
    git fetch origin
    git reset --hard origin/claude/dynamic-admin-backend-22x0H

    echo "✅ Dockerfile mis à jour depuis GitHub"
    echo ""

    # Vérifier à nouveau
    LINE_12=$(sed -n '12p' Dockerfile)
    echo "Nouvelle ligne 12: $LINE_12"
    echo ""
elif echo "$LINE_12" | grep -q "RUN npm ci$"; then
    echo "✅ Dockerfile correct: 'npm ci' (sans --only=production)"
    echo ""
else
    echo "⚠️  Format inattendu de la ligne 12"
    echo ""
fi

echo "2️⃣ Vérification de package.json..."
echo ""

if grep -A 20 '"devDependencies"' package.json | grep -q '"vite"'; then
    echo "✅ Vite trouvé dans devDependencies"
else
    echo "❌ Vite NON trouvé dans devDependencies"
fi
echo ""

echo "3️⃣ Vérification de docker-compose.yml..."
echo ""

if grep -q "^version:" docker-compose.yml; then
    echo "⚠️  Le fichier contient encore 'version:', suppression..."
    sed -i '/^version:/d' docker-compose.yml
    sed -i '/^$/N;/^\n$/d' docker-compose.yml
    echo "✅ Ligne 'version' supprimée"
else
    echo "✅ Pas de ligne 'version' obsolète"
fi
echo ""

echo "4️⃣ Nettoyage du cache Docker..."
echo ""

echo "Arrêt des conteneurs..."
docker compose down

echo "Suppression des images de build..."
docker rmi groupenovitec-novitec-app 2>/dev/null || true

echo "Nettoyage du cache de build..."
docker builder prune -f

echo ""
echo "5️⃣ Rebuild complet sans cache..."
echo ""

docker compose build --no-cache novitec-app

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD RÉUSSI!"
    echo ""
    echo "6️⃣ Démarrage des services..."
    docker compose up -d

    echo ""
    echo "7️⃣ Vérification de l'état..."
    sleep 5
    docker compose ps

    echo ""
    echo "🎉 INSTALLATION TERMINÉE!"
    echo ""
    echo "📱 Accès aux services:"
    echo "   Application: http://$(curl -s ifconfig.me)"
    echo "   Portainer: http://$(curl -s ifconfig.me):9000"
    echo "   Nginx Proxy Manager: http://$(curl -s ifconfig.me):81"
    echo ""
else
    echo ""
    echo "❌ Le build a échoué"
    echo ""
    echo "📝 Logs d'erreur:"
    docker compose logs --tail=50 novitec-app
    echo ""
    echo "Pour plus d'aide, partagez ces logs."
fi

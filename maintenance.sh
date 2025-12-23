#!/bin/bash

# ============================================
# SCRIPT DE MAINTENANCE - GROUPE NOVITEC
# ============================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Menu principal
show_menu() {
    clear
    echo "╔════════════════════════════════════════════════════════╗"
    echo "║       MAINTENANCE - GROUPE NOVITEC DOCKER             ║"
    echo "╚════════════════════════════════════════════════════════╝"
    echo ""
    echo "1.  📊 Voir l'état des conteneurs"
    echo "2.  📝 Voir les logs"
    echo "3.  🔄 Redémarrer tous les conteneurs"
    echo "4.  🔄 Redémarrer un conteneur spécifique"
    echo "5.  🆙 Mettre à jour les conteneurs"
    echo "6.  💾 Créer un backup manuel"
    echo "7.  📦 Restaurer depuis un backup"
    echo "8.  🧹 Nettoyer Docker (libérer de l'espace)"
    echo "9.  🔐 Générer de nouveaux secrets"
    echo "10. 📈 Voir les statistiques de ressources"
    echo "11. 🩺 Healthcheck complet"
    echo "12. 🔧 Rebuild l'application"
    echo "0.  ❌ Quitter"
    echo ""
    read -p "Choisissez une option: " choice
    echo ""
}

# 1. État des conteneurs
show_status() {
    log_info "État des conteneurs:"
    docker compose ps
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# 2. Voir les logs
show_logs() {
    echo "Quel conteneur?"
    echo "1. Tous"
    echo "2. Application (novitec-app)"
    echo "3. PostgreSQL"
    echo "4. Redis"
    echo "5. Nginx Proxy Manager"
    echo "6. Portainer"
    read -p "Choix: " log_choice

    case $log_choice in
        1) docker compose logs --tail=100 -f ;;
        2) docker compose logs --tail=100 -f novitec-app ;;
        3) docker compose logs --tail=100 -f postgres ;;
        4) docker compose logs --tail=100 -f redis ;;
        5) docker compose logs --tail=100 -f nginx-proxy-manager ;;
        6) docker compose logs --tail=100 -f portainer ;;
        *) log_error "Option invalide" ;;
    esac
}

# 3. Redémarrer tous
restart_all() {
    log_warning "Redémarrage de tous les conteneurs..."
    read -p "Êtes-vous sûr? (o/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        docker compose restart
        log_success "Tous les conteneurs ont été redémarrés"
    else
        log_info "Annulé"
    fi
    read -p "Appuyez sur Entrée pour continuer..."
}

# 4. Redémarrer un conteneur spécifique
restart_specific() {
    echo "Quel conteneur redémarrer?"
    echo "1. Application (novitec-app)"
    echo "2. PostgreSQL"
    echo "3. Redis"
    echo "4. Nginx Proxy Manager"
    echo "5. Portainer"
    read -p "Choix: " restart_choice

    case $restart_choice in
        1) docker compose restart novitec-app && log_success "Application redémarrée" ;;
        2) docker compose restart postgres && log_success "PostgreSQL redémarré" ;;
        3) docker compose restart redis && log_success "Redis redémarré" ;;
        4) docker compose restart nginx-proxy-manager && log_success "Nginx redémarré" ;;
        5) docker compose restart portainer && log_success "Portainer redémarré" ;;
        *) log_error "Option invalide" ;;
    esac
    read -p "Appuyez sur Entrée pour continuer..."
}

# 5. Mettre à jour
update_containers() {
    log_info "Mise à jour des conteneurs..."

    log_info "Téléchargement des nouvelles images..."
    docker compose pull

    log_info "Redémarrage avec les nouvelles images..."
    docker compose up -d

    log_success "Mise à jour terminée"

    log_info "Nettoyage des anciennes images..."
    docker image prune -f

    log_success "✅ Mise à jour complète!"
    read -p "Appuyez sur Entrée pour continuer..."
}

# 6. Backup manuel
create_backup() {
    BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="backups/manual"

    mkdir -p "$BACKUP_DIR"

    log_info "Création du backup..."

    # Backup PostgreSQL
    log_info "Backup de PostgreSQL..."
    docker exec novitec-postgres pg_dump -U novitec_user novitec_db > "$BACKUP_DIR/db_$BACKUP_DATE.sql"

    # Backup des volumes
    log_info "Backup des volumes..."
    tar -czf "$BACKUP_DIR/volumes_$BACKUP_DATE.tar.gz" \
        postgres-data \
        redis-data \
        nginx-data \
        portainer-data \
        uploads \
        2>/dev/null || true

    # Backup du .env
    cp .env "$BACKUP_DIR/env_$BACKUP_DATE.txt"

    log_success "✅ Backup créé dans $BACKUP_DIR/"
    log_info "Fichiers créés:"
    ls -lh "$BACKUP_DIR/"*"$BACKUP_DATE"*

    read -p "Appuyez sur Entrée pour continuer..."
}

# 7. Restaurer
restore_backup() {
    log_warning "⚠️  RESTAURATION DEPUIS UN BACKUP"
    echo ""
    log_warning "Ceci va ÉCRASER les données actuelles!"
    echo ""

    ls -lht backups/*.sql 2>/dev/null | head -10 || log_error "Aucun backup trouvé"

    echo ""
    read -p "Entrez le nom du fichier de backup (ou 'q' pour annuler): " backup_file

    if [ "$backup_file" = "q" ]; then
        log_info "Annulé"
        return
    fi

    if [ ! -f "$backup_file" ]; then
        log_error "Fichier introuvable: $backup_file"
        read -p "Appuyez sur Entrée pour continuer..."
        return
    fi

    read -p "Êtes-vous VRAIMENT sûr? Tapez 'RESTORE' pour confirmer: " confirm

    if [ "$confirm" = "RESTORE" ]; then
        log_info "Restauration en cours..."

        # Arrêter l'application
        docker compose stop novitec-app

        # Restaurer la base de données
        cat "$backup_file" | docker exec -i novitec-postgres psql -U novitec_user novitec_db

        # Redémarrer
        docker compose start novitec-app

        log_success "✅ Restauration terminée"
    else
        log_info "Annulé"
    fi

    read -p "Appuyez sur Entrée pour continuer..."
}

# 8. Nettoyer Docker
cleanup_docker() {
    log_warning "Nettoyage de Docker..."

    echo "Espace utilisé actuellement:"
    docker system df
    echo ""

    log_warning "Ceci va supprimer:"
    echo "  - Tous les conteneurs arrêtés"
    echo "  - Toutes les images non utilisées"
    echo "  - Tous les réseaux non utilisés"
    echo "  - Tous les caches de build"
    echo ""

    read -p "Continuer? (o/N) " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Oo]$ ]]; then
        docker system prune -af
        log_success "Nettoyage terminé"

        echo ""
        echo "Nouvel espace utilisé:"
        docker system df
    else
        log_info "Annulé"
    fi

    read -p "Appuyez sur Entrée pour continuer..."
}

# 9. Générer de nouveaux secrets
generate_secrets() {
    log_warning "⚠️  GÉNÉRATION DE NOUVEAUX SECRETS"
    echo ""
    log_warning "Ceci va modifier le fichier .env"
    log_warning "L'ancien fichier sera sauvegardé en .env.backup"
    echo ""

    read -p "Continuer? (o/N) " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Oo]$ ]]; then
        # Backup de l'ancien .env
        cp .env .env.backup.$(date +%Y%m%d_%H%M%S)

        # Générer de nouveaux secrets
        NEW_DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
        NEW_REDIS_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
        NEW_JWT_SECRET=$(openssl rand -hex 64)

        # Mettre à jour le .env
        sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$NEW_DB_PASSWORD/" .env
        sed -i "s/REDIS_PASSWORD=.*/REDIS_PASSWORD=$NEW_REDIS_PASSWORD/" .env
        sed -i "s/JWT_SECRET=.*/JWT_SECRET=$NEW_JWT_SECRET/" .env

        log_success "Nouveaux secrets générés!"
        log_warning "Vous devez redémarrer tous les conteneurs pour appliquer les changements:"
        log_info "docker compose down && docker compose up -d"
    else
        log_info "Annulé"
    fi

    read -p "Appuyez sur Entrée pour continuer..."
}

# 10. Statistiques
show_stats() {
    log_info "Statistiques de ressources (Ctrl+C pour quitter):"
    echo ""
    docker stats
}

# 11. Healthcheck
healthcheck() {
    log_info "Healthcheck complet..."
    echo ""

    # Check Docker
    log_info "Docker: $(docker --version)"

    # Check conteneurs
    log_info "État des conteneurs:"
    docker compose ps
    echo ""

    # Check API
    log_info "Test de l'API..."
    if curl -s http://localhost:3001/api/health | grep -q "ok"; then
        log_success "✅ API: Opérationnelle"
    else
        log_error "❌ API: Non accessible"
    fi

    # Check PostgreSQL
    log_info "Test de PostgreSQL..."
    if docker exec novitec-postgres pg_isready -U novitec_user > /dev/null 2>&1; then
        log_success "✅ PostgreSQL: Opérationnelle"
    else
        log_error "❌ PostgreSQL: Non accessible"
    fi

    # Check Redis
    log_info "Test de Redis..."
    if docker exec novitec-redis redis-cli -a "$REDIS_PASSWORD" ping 2>/dev/null | grep -q "PONG"; then
        log_success "✅ Redis: Opérationnel"
    else
        log_error "❌ Redis: Non accessible"
    fi

    # Check disk space
    log_info "Espace disque:"
    df -h | grep -E '^Filesystem|/$'
    echo ""

    # Check Docker disk usage
    log_info "Utilisation Docker:"
    docker system df

    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
}

# 12. Rebuild
rebuild_app() {
    log_warning "Rebuild de l'application..."
    echo ""
    log_warning "Ceci va:"
    echo "  1. Arrêter l'application"
    echo "  2. Reconstruire l'image Docker"
    echo "  3. Redémarrer l'application"
    echo ""

    read -p "Continuer? (o/N) " -n 1 -r
    echo

    if [[ $REPLY =~ ^[Oo]$ ]]; then
        log_info "Arrêt de l'application..."
        docker compose stop novitec-app

        log_info "Rebuild de l'image..."
        docker compose build --no-cache novitec-app

        log_info "Démarrage de l'application..."
        docker compose up -d novitec-app

        log_success "✅ Rebuild terminé"

        log_info "Vérification du statut..."
        sleep 5
        docker compose ps novitec-app
    else
        log_info "Annulé"
    fi

    read -p "Appuyez sur Entrée pour continuer..."
}

# Boucle principale
while true; do
    show_menu

    case $choice in
        1) show_status ;;
        2) show_logs ;;
        3) restart_all ;;
        4) restart_specific ;;
        5) update_containers ;;
        6) create_backup ;;
        7) restore_backup ;;
        8) cleanup_docker ;;
        9) generate_secrets ;;
        10) show_stats ;;
        11) healthcheck ;;
        12) rebuild_app ;;
        0) log_info "Au revoir!" ; exit 0 ;;
        *) log_error "Option invalide" ; sleep 2 ;;
    esac
done

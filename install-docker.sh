#!/bin/bash

# ============================================
# SCRIPT D'INSTALLATION DOCKER - GROUPE NOVITEC
# ============================================
# Ce script installe Docker, Docker Compose et configure l'environnement
# Compatible: Ubuntu 20.04+, Debian 11+, CentOS 8+

set -e  # Arrêter en cas d'erreur

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si le script est exécuté en tant que root
if [[ $EUID -eq 0 ]]; then
   log_error "Ce script ne doit PAS être exécuté en tant que root (n'utilisez pas sudo)"
   exit 1
fi

log_info "╔════════════════════════════════════════════════════════╗"
log_info "║   Installation Docker - Groupe Novitec                ║"
log_info "╚════════════════════════════════════════════════════════╝"
echo ""

# ============================================
# 1. DÉTECTION DU SYSTÈME D'EXPLOITATION
# ============================================
log_info "Détection du système d'exploitation..."

if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    OS_VERSION=$VERSION_ID
    log_success "OS détecté: $OS $OS_VERSION"
else
    log_error "Impossible de détecter le système d'exploitation"
    exit 1
fi

# ============================================
# 2. MISE À JOUR DU SYSTÈME
# ============================================
log_info "Mise à jour du système..."

if [[ "$OS" == "ubuntu" ]] || [[ "$OS" == "debian" ]]; then
    sudo apt-get update
    sudo apt-get upgrade -y
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        git \
        wget \
        nano \
        ufw
elif [[ "$OS" == "centos" ]] || [[ "$OS" == "rhel" ]] || [[ "$OS" == "fedora" ]]; then
    sudo yum update -y
    sudo yum install -y \
        yum-utils \
        device-mapper-persistent-data \
        lvm2 \
        curl \
        git \
        wget \
        nano \
        firewalld
else
    log_error "Système d'exploitation non supporté: $OS"
    exit 1
fi

log_success "Système mis à jour"

# ============================================
# 3. INSTALLATION DE DOCKER
# ============================================
log_info "Installation de Docker..."

if command -v docker &> /dev/null; then
    log_warning "Docker est déjà installé (version $(docker --version))"
    read -p "Voulez-vous réinstaller Docker? (o/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Oo]$ ]]; then
        log_info "Installation de Docker ignorée"
    else
        # Désinstaller l'ancienne version
        if [[ "$OS" == "ubuntu" ]] || [[ "$OS" == "debian" ]]; then
            sudo apt-get remove -y docker docker-engine docker.io containerd runc || true
        fi
    fi
else
    if [[ "$OS" == "ubuntu" ]] || [[ "$OS" == "debian" ]]; then
        # Ajouter le repository Docker
        curl -fsSL https://download.docker.com/linux/$OS/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/$OS \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

        sudo apt-get update
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    elif [[ "$OS" == "centos" ]] || [[ "$OS" == "rhel" ]] || [[ "$OS" == "fedora" ]]; then
        sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    fi

    log_success "Docker installé: $(docker --version)"
fi

# ============================================
# 4. CONFIGURATION DE DOCKER
# ============================================
log_info "Configuration de Docker..."

# Démarrer et activer Docker
sudo systemctl start docker
sudo systemctl enable docker

# Ajouter l'utilisateur au groupe docker
sudo usermod -aG docker $USER

log_success "Docker configuré et démarré"

# ============================================
# 5. CONFIGURATION DU PARE-FEU
# ============================================
log_info "Configuration du pare-feu..."

if [[ "$OS" == "ubuntu" ]] || [[ "$OS" == "debian" ]]; then
    sudo ufw --force enable
    sudo ufw allow 22/tcp comment 'SSH'
    sudo ufw allow 80/tcp comment 'HTTP'
    sudo ufw allow 443/tcp comment 'HTTPS'
    sudo ufw allow 81/tcp comment 'Nginx Proxy Manager'
    sudo ufw allow 9000/tcp comment 'Portainer'
    sudo ufw allow 9443/tcp comment 'Portainer HTTPS'
    sudo ufw reload
    log_success "UFW configuré"
elif [[ "$OS" == "centos" ]] || [[ "$OS" == "rhel" ]] || [[ "$OS" == "fedora" ]]; then
    sudo systemctl start firewalld
    sudo systemctl enable firewalld
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --permanent --add-port=81/tcp
    sudo firewall-cmd --permanent --add-port=9000/tcp
    sudo firewall-cmd --permanent --add-port=9443/tcp
    sudo firewall-cmd --reload
    log_success "Firewalld configuré"
fi

# ============================================
# 6. GÉNÉRATION DES SECRETS
# ============================================
log_info "Génération des secrets sécurisés..."

if [ ! -f .env ]; then
    cp .env.example .env

    # Générer des mots de passe aléatoires
    DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
    REDIS_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
    JWT_SECRET=$(openssl rand -hex 64)

    # Remplacer dans le fichier .env
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env
    sed -i "s/REDIS_PASSWORD=.*/REDIS_PASSWORD=$REDIS_PASSWORD/" .env
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env

    log_success "Fichier .env créé avec des secrets sécurisés"
    log_warning "IMPORTANT: Sauvegardez le fichier .env en lieu sûr!"
else
    log_warning "Le fichier .env existe déjà, génération de secrets ignorée"
fi

# ============================================
# 7. CONFIGURATION DU DOMAINE
# ============================================
log_info "Configuration du domaine..."

read -p "Entrez votre nom de domaine (ex: novitec.ca) ou appuyez sur Entrée pour ignorer: " DOMAIN

if [ ! -z "$DOMAIN" ]; then
    sed -i "s|FRONTEND_URL=.*|FRONTEND_URL=https://$DOMAIN|" .env
    log_success "Domaine configuré: $DOMAIN"
    log_info "N'oubliez pas de configurer vos DNS pour pointer vers ce serveur:"
    log_info "  - A record: @ → $(curl -s ifconfig.me)"
    log_info "  - A record: www → $(curl -s ifconfig.me)"
else
    log_warning "Configuration du domaine ignorée"
fi

# ============================================
# 8. CRÉATION DES DOSSIERS
# ============================================
log_info "Création des dossiers de données..."

mkdir -p postgres-data redis-data nginx-data portainer-data backups uploads logs

log_success "Dossiers créés"

# ============================================
# 9. BUILD ET DÉMARRAGE DES CONTENEURS
# ============================================
log_info "Build de l'application..."

# Build de l'image Docker
docker compose build

log_success "Application buildée"

log_info "Démarrage des conteneurs Docker..."

# Démarrer tous les services
docker compose up -d

log_success "Conteneurs démarrés"

# ============================================
# 10. ATTENDRE QUE LES SERVICES SOIENT PRÊTS
# ============================================
log_info "Attente du démarrage des services (cela peut prendre 30-60 secondes)..."

sleep 10

# Vérifier l'état des conteneurs
docker compose ps

# ============================================
# 11. AFFICHAGE DES INFORMATIONS
# ============================================
echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║           INSTALLATION TERMINÉE AVEC SUCCÈS!           ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

SERVER_IP=$(curl -s ifconfig.me)

log_success "Votre serveur est accessible à l'adresse: $SERVER_IP"
echo ""

log_info "INTERFACES D'ADMINISTRATION:"
echo ""
echo "  📦 Portainer (Gestion Docker)"
echo "     http://$SERVER_IP:9000"
echo "     Créez votre compte admin lors de la première visite"
echo ""
echo "  🌐 Nginx Proxy Manager (Reverse Proxy & SSL)"
echo "     http://$SERVER_IP:81"
echo "     Email: admin@example.com"
echo "     Password: changeme"
echo "     ⚠️  CHANGEZ CES IDENTIFIANTS IMMÉDIATEMENT!"
echo ""
echo "  🚀 Application Groupe Novitec"
echo "     http://$SERVER_IP"
echo "     Admin: http://$SERVER_IP/#/admin/login"
echo "     Username: admin"
echo "     Password: admin123"
echo "     ⚠️  CHANGEZ CE MOT DE PASSE IMMÉDIATEMENT!"
echo ""

log_warning "PROCHAINES ÉTAPES:"
echo ""
echo "  1. Reconnectez-vous pour appliquer les permissions Docker:"
echo "     $ exit"
echo "     $ ssh $USER@$SERVER_IP"
echo ""
echo "  2. Configurez Nginx Proxy Manager:"
echo "     - Connectez-vous à http://$SERVER_IP:81"
echo "     - Changez les identifiants par défaut"
echo "     - Créez un Proxy Host pour votre domaine"
echo "     - Activez SSL avec Let's Encrypt"
echo ""
echo "  3. Sécurisez votre application:"
echo "     - Changez le mot de passe admin de l'application"
echo "     - Changez les identifiants Portainer"
echo "     - Changez les identifiants Nginx Proxy Manager"
echo ""
echo "  4. Sauvegardez le fichier .env en lieu sûr!"
echo ""

log_info "COMMANDES UTILES:"
echo ""
echo "  Voir les logs:           docker compose logs -f"
echo "  Redémarrer:             docker compose restart"
echo "  Arrêter:                docker compose down"
echo "  Mettre à jour:          docker compose pull && docker compose up -d"
echo "  Voir l'état:            docker compose ps"
echo ""

log_success "Installation complète! 🎉"

# 🐳 Groupe Novitec - Déploiement Docker

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)

Infrastructure Docker complète et prête pour la production avec:
- ✅ Nginx Proxy Manager (reverse proxy + SSL automatique)
- ✅ Portainer (interface de gestion Docker)
- ✅ PostgreSQL 16 (base de données)
- ✅ Redis (cache et sessions)
- ✅ Node.js 20 (backend)
- ✅ React 19 (frontend)
- ✅ Backup automatique quotidien
- ✅ Auto-update avec Watchtower

---

## 📋 Table des Matières

- [Démarrage Rapide](#-démarrage-rapide)
- [Installation Complète (Production)](#-installation-complète-production)
- [Architecture](#-architecture)
- [Services Inclus](#-services-inclus)
- [Configuration](#-configuration)
- [Maintenance](#-maintenance)
- [Sécurité](#-sécurité)
- [Backup & Restauration](#-backup--restauration)

---

## 🚀 Démarrage Rapide

### Pour développement local

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/groupenovitec.git
cd groupenovitec

# 2. Démarrer avec le script rapide
./quick-start.sh
```

C'est tout! L'application sera accessible sur http://localhost

---

## 🏭 Installation Complète (Production)

### Prérequis

- Serveur Linux (Ubuntu 20.04+, Debian 11+, CentOS 8+)
- 2GB+ RAM (4GB recommandé)
- 20GB+ stockage
- Nom de domaine (optionnel mais recommandé)

### Installation en une commande

```bash
# 1. Se connecter au serveur
ssh votre-utilisateur@votre-serveur

# 2. Cloner le repository
git clone https://github.com/votre-username/groupenovitec.git
cd groupenovitec

# 3. Lancer l'installation automatique
./install-docker.sh
```

Le script va:
- ✅ Installer Docker et Docker Compose
- ✅ Configurer le pare-feu
- ✅ Générer des secrets sécurisés
- ✅ Builder et démarrer tous les conteneurs
- ✅ Configurer les backups automatiques

**Durée**: ~10 minutes

### Post-installation

1. **Reconnectez-vous** pour que les permissions Docker prennent effet
2. **Configurez Nginx Proxy Manager** (http://votre-ip:81)
3. **Sécurisez Portainer** (http://votre-ip:9000)
4. **Changez le mot de passe admin** de l'application

Consultez le [Guide d'Installation Complet](./DOCKER_INSTALLATION_GUIDE.md) pour les détails.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET                             │
└──────────────────────┬──────────────────────────────────┘
                       │ Port 80/443
                       ▼
        ┌──────────────────────────────┐
        │  Nginx Proxy Manager         │
        │  - Reverse Proxy             │
        │  - SSL/TLS (Let's Encrypt)   │
        │  - Load Balancing            │
        └──────────────┬───────────────┘
                       │
          ┌────────────┴──────────────┐
          │                           │
          ▼                           ▼
   ┌─────────────┐           ┌──────────────┐
   │ Application │           │  Portainer   │
   │  Node.js    │           │  (Admin)     │
   │  + React    │           └──────────────┘
   └──────┬──────┘
          │
    ┌─────┴─────┬──────────┐
    │           │          │
    ▼           ▼          ▼
┌─────────┐ ┌──────┐  ┌────────┐
│PostgreSQL│ │Redis │  │Backups │
└──────────┘ └──────┘  └────────┘
```

---

## 📦 Services Inclus

### 1. Nginx Proxy Manager
- **Port**: 81 (interface admin)
- **Fonction**: Reverse proxy, gestion SSL automatique
- **URL**: http://votre-ip:81
- **Identifiants par défaut**: admin@example.com / changeme

### 2. Portainer
- **Port**: 9000 (HTTP), 9443 (HTTPS)
- **Fonction**: Interface web pour gérer Docker
- **URL**: http://votre-ip:9000

### 3. PostgreSQL 16
- **Port**: 5432 (interne uniquement)
- **Fonction**: Base de données principale
- **User**: Configuré dans .env

### 4. Redis
- **Port**: 6379 (interne uniquement)
- **Fonction**: Cache et sessions
- **Password**: Configuré dans .env

### 5. Application Node.js
- **Port**: 3001 (interne)
- **Fonction**: Backend API + Frontend React
- **Healthcheck**: /api/health

### 6. Backup Automatique
- **Fonction**: Sauvegarde quotidienne PostgreSQL
- **Rétention**: 7 jours, 4 semaines, 6 mois
- **Localisation**: ./backups/

### 7. Watchtower
- **Fonction**: Auto-update des conteneurs
- **Fréquence**: Vérification quotidienne

---

## ⚙️ Configuration

### Variables d'Environnement (.env)

```env
# Base de données
DB_USER=novitec_user
DB_PASSWORD=xxx  # Généré automatiquement
DB_NAME=novitec_db

# Redis
REDIS_PASSWORD=xxx  # Généré automatiquement

# JWT
JWT_SECRET=xxx  # Généré automatiquement

# Application
FRONTEND_URL=https://votre-domaine.com
PORT=3001
NODE_ENV=production
```

### Personnalisation

Éditez `docker-compose.yml` pour:
- Modifier les ports
- Ajouter des services
- Changer les configurations
- Ajuster les ressources

---

## 🔧 Maintenance

### Script de Maintenance Interactif

```bash
./maintenance.sh
```

Options disponibles:
1. 📊 Voir l'état des conteneurs
2. 📝 Voir les logs
3. 🔄 Redémarrer
4. 🆙 Mettre à jour
5. 💾 Créer un backup
6. 📦 Restaurer depuis un backup
7. 🧹 Nettoyer Docker
8. Et plus...

### Commandes Docker Directes

```bash
# Voir l'état
docker compose ps

# Voir les logs
docker compose logs -f

# Redémarrer
docker compose restart

# Mettre à jour
docker compose pull
docker compose up -d

# Arrêter
docker compose down

# Rebuild
docker compose up -d --build
```

---

## 🔒 Sécurité

### Checklist de Sécurité

#### Obligatoire (Avant Production)

- [ ] Changer le mot de passe admin de l'application
- [ ] Changer les identifiants Nginx Proxy Manager
- [ ] Créer un compte admin Portainer sécurisé
- [ ] Configurer SSL/HTTPS avec Let's Encrypt
- [ ] Modifier tous les secrets dans .env
- [ ] Sauvegarder le fichier .env en lieu sûr
- [ ] Fermer les ports 81 et 9000 depuis l'extérieur (accès via sous-domaines)

#### Recommandé

- [ ] Installer fail2ban
- [ ] Configurer les mises à jour automatiques de sécurité
- [ ] Utiliser des clés SSH au lieu de mots de passe
- [ ] Configurer un pare-feu (UFW/firewalld)
- [ ] Mettre en place une stratégie de backup externe
- [ ] Monitorer les logs

### Ports Ouverts

**Obligatoires:**
- 80 (HTTP) - redirigé vers HTTPS
- 443 (HTTPS) - application principale
- 22 (SSH) - administration serveur

**Temporaires (fermez après configuration):**
- 81 - Nginx Proxy Manager (accédez via sous-domaine après config)
- 9000 - Portainer (accédez via sous-domaine après config)

### Génération de Nouveaux Secrets

```bash
# Via le script de maintenance
./maintenance.sh
# → Option 9: Générer de nouveaux secrets

# OU manuellement
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 💾 Backup & Restauration

### Backups Automatiques

Les backups PostgreSQL sont créés automatiquement:
- **Fréquence**: Quotidien à minuit
- **Localisation**: `./backups/`
- **Rétention**:
  - 7 derniers jours
  - 4 dernières semaines
  - 6 derniers mois

### Backup Manuel

```bash
# Via le script de maintenance
./maintenance.sh
# → Option 6: Créer un backup manuel

# OU directement
docker exec novitec-postgres pg_dump -U novitec_user novitec_db > backup_$(date +%Y%m%d).sql
```

### Restauration

```bash
# Via le script de maintenance
./maintenance.sh
# → Option 7: Restaurer depuis un backup

# OU directement
cat backup_20240101.sql | docker exec -i novitec-postgres psql -U novitec_user novitec_db
```

### Backup Complet (Avant Mise à Jour Majeure)

```bash
# Créer un backup complet de tous les volumes
tar -czf backup_complete_$(date +%Y%m%d).tar.gz \
    postgres-data \
    redis-data \
    nginx-data \
    portainer-data \
    uploads \
    .env
```

---

## 📊 Monitoring

### Healthchecks

Tous les services ont des healthchecks configurés:

```bash
# Vérifier l'état de santé
docker compose ps

# Healthcheck manuel de l'application
curl http://localhost:3001/api/health
```

### Logs

```bash
# Tous les logs
docker compose logs -f

# Logs d'un service spécifique
docker compose logs -f novitec-app

# Dernières 100 lignes
docker compose logs --tail=100 novitec-app
```

### Ressources

```bash
# Statistiques en temps réel
docker stats

# Utilisation de l'espace disque
docker system df
```

---

## 🐛 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
docker compose logs novitec-app

# Vérifier que PostgreSQL est prêt
docker compose ps postgres

# Rebuild
docker compose build --no-cache novitec-app
docker compose up -d novitec-app
```

### Erreur 502 Bad Gateway

- Vérifiez que le nom du conteneur dans Nginx est `novitec-app` (pas localhost)
- Vérifiez que Websockets Support est activé pour Socket.IO
- Vérifiez les logs: `docker compose logs nginx-proxy-manager`

### PostgreSQL ne démarre pas

```bash
# Vérifier les permissions
sudo chown -R 999:999 postgres-data

# Redémarrer
docker compose restart postgres
```

### Socket.IO ne se connecte pas

- Vérifiez que "Websockets Support" est activé dans Nginx Proxy Manager
- Consultez la console du navigateur pour les erreurs
- Vérifiez les logs de l'application

Consultez le [Guide Complet de Dépannage](./DOCKER_INSTALLATION_GUIDE.md#dépannage)

---

## 📚 Documentation

- [Guide d'Installation Complet](./DOCKER_INSTALLATION_GUIDE.md)
- [Documentation Backend](./BACKEND_README.md)
- [docker-compose.yml](./docker-compose.yml) - Configuration complète
- [Dockerfile](./Dockerfile) - Build de l'application

---

## 🤝 Support

- 📧 Email: support@novitec.ca
- 📱 Téléphone: 514-360-1757
- 🌐 Web: https://novitec.ca

---

## 📄 Licence

Copyright © 2024 Groupe Novitec. Tous droits réservés.

---

**Déployé avec ❤️ par Groupe Novitec**

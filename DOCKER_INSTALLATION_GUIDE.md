# 🐳 Guide d'Installation Docker - Groupe Novitec

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation Automatique](#installation-automatique)
3. [Configuration Nginx Proxy Manager](#configuration-nginx-proxy-manager)
4. [Configuration Portainer](#configuration-portainer)
5. [Sécurisation](#sécurisation)
6. [Commandes Utiles](#commandes-utiles)
7. [Dépannage](#dépannage)
8. [Backup et Restauration](#backup-et-restauration)

---

## 🔧 Prérequis

### Serveur
- **OS**: Ubuntu 20.04+, Debian 11+, ou CentOS 8+
- **RAM**: Minimum 2GB (4GB recommandé)
- **Stockage**: Minimum 20GB
- **CPU**: 2 cores minimum

### Réseau
- **Port 22**: SSH
- **Port 80**: HTTP
- **Port 443**: HTTPS
- **Port 81**: Nginx Proxy Manager (temporaire, à fermer après config)
- **Port 9000**: Portainer (temporaire, à fermer après config)

### DNS (si vous avez un domaine)
Configurez vos enregistrements DNS pour pointer vers l'IP de votre serveur:
```
Type A: @     → Votre-IP-Serveur
Type A: www   → Votre-IP-Serveur
```

---

## 🚀 Installation Automatique

### Étape 1: Connexion au serveur

```bash
ssh votre-utilisateur@votre-serveur
```

### Étape 2: Cloner le repository

```bash
cd ~
git clone https://github.com/votre-username/groupenovitec.git
cd groupenovitec
```

### Étape 3: Rendre le script exécutable

```bash
chmod +x install-docker.sh
```

### Étape 4: Lancer l'installation

```bash
./install-docker.sh
```

Le script va:
- ✅ Installer Docker et Docker Compose
- ✅ Configurer le pare-feu
- ✅ Générer des secrets sécurisés
- ✅ Créer les dossiers nécessaires
- ✅ Builder l'application
- ✅ Démarrer tous les conteneurs

**Durée estimée**: 5-10 minutes

### Étape 5: Reconnexion

Après l'installation, reconnectez-vous pour que les permissions Docker prennent effet:

```bash
exit
ssh votre-utilisateur@votre-serveur
cd groupenovitec
```

---

## 🌐 Configuration Nginx Proxy Manager

### Accès initial

Ouvrez votre navigateur à: `http://VOTRE-IP:81`

**Identifiants par défaut:**
- Email: `admin@example.com`
- Password: `changeme`

### Première connexion

1. **Changez immédiatement** vos identifiants
2. Remplissez vos informations

### Créer un Proxy Host pour votre application

1. Cliquez sur **"Proxy Hosts"** → **"Add Proxy Host"**

2. Onglet **"Details"**:
   - **Domain Names**: `votre-domaine.com`, `www.votre-domaine.com`
   - **Scheme**: `http`
   - **Forward Hostname / IP**: `novitec-app` (nom du conteneur)
   - **Forward Port**: `3001`
   - Cochez: ✅ **Block Common Exploits**
   - Cochez: ✅ **Websockets Support** (pour Socket.IO)

3. Onglet **"SSL"**:
   - **SSL Certificate**: Cliquez sur "Request a new SSL Certificate"
   - Cochez: ✅ **Force SSL**
   - Cochez: ✅ **HTTP/2 Support**
   - Cochez: ✅ **HSTS Enabled**
   - Email: Votre email pour Let's Encrypt
   - Cochez: ✅ **I Agree to the Let's Encrypt Terms of Service**

4. Cliquez sur **"Save"**

### Créer un Proxy Host pour Portainer (optionnel)

Répétez les mêmes étapes avec:
- **Domain Names**: `portainer.votre-domaine.com`
- **Forward Hostname / IP**: `portainer`
- **Forward Port**: `9000`

---

## 📦 Configuration Portainer

### Accès initial

Ouvrez: `http://VOTRE-IP:9000`

### Première connexion

1. **Créez votre compte administrateur**:
   - Username: `admin`
   - Password: (choisissez un mot de passe fort)

2. **Connectez l'environnement local**:
   - Sélectionnez "Get Started"
   - Portainer détectera automatiquement votre environnement Docker local

### Utilisation

Depuis Portainer, vous pouvez:
- 📊 Voir l'état de tous vos conteneurs
- 📝 Consulter les logs
- 🔄 Redémarrer/arrêter des conteneurs
- 💾 Gérer les volumes
- 🌐 Gérer les réseaux
- 📈 Voir les statistiques de ressources

---

## 🔒 Sécurisation

### 1. Changez tous les mots de passe par défaut

- ✅ Nginx Proxy Manager: `admin@example.com` / `changeme`
- ✅ Portainer: Créer un nouveau compte admin
- ✅ Application Novitec: `admin` / `admin123`

### 2. Fermez les ports d'administration après configuration

Une fois Nginx Proxy Manager configuré avec vos domaines et SSL:

```bash
# Bloquer l'accès direct aux ports d'admin depuis l'extérieur
sudo ufw deny 81/tcp
sudo ufw deny 9000/tcp

# Vous pourrez toujours y accéder via les sous-domaines configurés dans Nginx
```

### 3. Activez les mises à jour automatiques de sécurité

```bash
# Ubuntu/Debian
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 4. Configurez fail2ban pour SSH

```bash
sudo apt-get install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 5. Utilisez des clés SSH au lieu de mots de passe

```bash
# Sur votre machine locale
ssh-keygen -t ed25519 -C "votre-email@example.com"
ssh-copy-id votre-utilisateur@votre-serveur

# Sur le serveur, désactivez l'authentification par mot de passe
sudo nano /etc/ssh/sshd_config
# Changez: PasswordAuthentication no
sudo systemctl restart sshd
```

---

## 💻 Commandes Utiles

### Gestion des conteneurs

```bash
# Voir l'état des conteneurs
docker compose ps

# Voir les logs de tous les conteneurs
docker compose logs -f

# Voir les logs d'un conteneur spécifique
docker compose logs -f novitec-app

# Redémarrer tous les conteneurs
docker compose restart

# Redémarrer un conteneur spécifique
docker compose restart novitec-app

# Arrêter tous les conteneurs
docker compose down

# Démarrer tous les conteneurs
docker compose up -d

# Reconstruire et redémarrer
docker compose up -d --build
```

### Mises à jour

```bash
# Mettre à jour les images et redémarrer
docker compose pull
docker compose up -d

# Nettoyer les anciennes images
docker image prune -a
```

### Maintenance

```bash
# Voir l'utilisation de l'espace disque
docker system df

# Nettoyer tout (attention: supprime les volumes non utilisés!)
docker system prune -a --volumes

# Sauvegarder manuellement la base de données
docker exec novitec-postgres pg_dump -U novitec_user novitec_db > backup_$(date +%Y%m%d).sql
```

---

## 🐛 Dépannage

### Le conteneur novitec-app ne démarre pas

```bash
# Vérifier les logs
docker compose logs novitec-app

# Problèmes courants:
# 1. La base de données n'est pas prête
#    → Attendez quelques secondes et vérifiez: docker compose ps

# 2. Erreur de build
#    → Reconstruisez: docker compose build --no-cache novitec-app

# 3. Problème de port
#    → Vérifiez qu'aucun autre service n'utilise le port 3001
```

### PostgreSQL ne démarre pas

```bash
# Vérifier les logs
docker compose logs postgres

# Si les permissions sont incorrectes:
sudo chown -R 999:999 postgres-data

# Redémarrer
docker compose restart postgres
```

### Nginx Proxy Manager - Erreur 502

```bash
# Vérifier que l'application est démarrée
docker compose ps novitec-app

# Vérifier les logs
docker compose logs nginx-proxy-manager

# Vérifier que le nom du conteneur est correct dans la config
# Il doit être: novitec-app (pas localhost ou 127.0.0.1)
```

### Socket.IO ne se connecte pas

- ✅ Vérifiez que "Websockets Support" est activé dans Nginx Proxy Manager
- ✅ Vérifiez les logs: `docker compose logs novitec-app`
- ✅ Vérifiez la console du navigateur pour les erreurs

---

## 💾 Backup et Restauration

### Backups Automatiques

Les backups de PostgreSQL sont créés automatiquement chaque jour à minuit et stockés dans `/backups/`.

**Rétention:**
- 7 derniers jours (backups quotidiens)
- 4 dernières semaines (backups hebdomadaires)
- 6 derniers mois (backups mensuels)

### Backup Manuel

```bash
# Backup complet de PostgreSQL
docker exec novitec-postgres pg_dump -U novitec_user novitec_db > backup_manual_$(date +%Y%m%d_%H%M%S).sql

# Backup de tous les volumes Docker
tar -czf backup_volumes_$(date +%Y%m%d).tar.gz postgres-data redis-data nginx-data portainer-data uploads
```

### Restauration

```bash
# Restaurer PostgreSQL depuis un backup
cat backup_20240101.sql | docker exec -i novitec-postgres psql -U novitec_user novitec_db

# OU depuis un fichier dans le conteneur
docker cp backup_20240101.sql novitec-postgres:/tmp/
docker exec novitec-postgres psql -U novitec_user novitec_db < /tmp/backup_20240101.sql
```

### Sauvegarde du fichier .env

**⚠️ TRÈS IMPORTANT!**

Le fichier `.env` contient tous vos secrets. Sauvegardez-le en lieu sûr:

```bash
# Copier localement
scp votre-utilisateur@votre-serveur:~/groupenovitec/.env ./backup-env-$(date +%Y%m%d).txt
```

---

## 🔐 Variables d'Environnement

Toutes les variables sont dans le fichier `.env`:

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
```

---

## 📊 Monitoring

### Vérifier la santé des services

```bash
# Healthcheck de tous les conteneurs
docker compose ps

# Healthcheck de l'application
curl http://localhost:3001/api/health

# Stats de ressources
docker stats
```

### Logs

```bash
# Tous les logs
docker compose logs -f

# Logs de l'application uniquement
docker compose logs -f novitec-app

# Dernières 100 lignes
docker compose logs --tail=100 novitec-app
```

---

## 🚀 Mise en Production - Checklist

Avant de mettre en production:

- [ ] Tous les mots de passe par défaut ont été changés
- [ ] SSL/HTTPS est configuré et fonctionne
- [ ] Les backups automatiques sont en place et testés
- [ ] Le fichier `.env` est sauvegardé en lieu sûr
- [ ] Les ports d'administration (81, 9000) sont fermés depuis l'extérieur
- [ ] fail2ban est installé et configuré
- [ ] Les mises à jour automatiques de sécurité sont activées
- [ ] Nginx Proxy Manager est configuré avec vos domaines
- [ ] Les DNS pointent correctement vers votre serveur
- [ ] Vous avez testé la synchronisation temps réel (Socket.IO)
- [ ] Vous avez testé le changement de mot de passe dans l'admin

---

## 📞 Support

Pour toute question:
- 📧 Email: support@novitec.ca
- 📱 Téléphone: 514-360-1757

---

**Bon déploiement! 🎉**

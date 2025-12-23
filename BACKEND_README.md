# 🚀 Backend Dynamique - Groupe Novitec

## 📋 Vue d'ensemble

Le backend a été entièrement modernisé avec les fonctionnalités suivantes :

✅ **Authentification sécurisée JWT**
✅ **Hachage des mots de passe avec bcrypt**
✅ **Synchronisation temps réel avec Socket.IO**
✅ **Protection des routes backend**
✅ **Changement de mot de passe dans l'interface admin**
✅ **Base de données PostgreSQL**

---

## 🔐 Système d'Authentification

### Structure de la base de données

Nouvelle table `users` créée automatiquement au démarrage :

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

### Utilisateur par défaut

Au premier démarrage, un utilisateur admin est créé automatiquement :

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Changez ce mot de passe immédiatement après la première connexion via l'onglet "Sécurité" du panneau d'administration.

---

## 🔌 Synchronisation Temps Réel

Le système utilise **Socket.IO** pour synchroniser automatiquement les changements entre tous les navigateurs connectés.

### Événements en temps réel :

- `settings:updated` - Paramètres du site modifiés
- `posts:created` / `posts:deleted` - Articles de blog
- `jobs:created` / `jobs:deleted` - Offres d'emploi
- `team:created` / `team:deleted` - Membres de l'équipe
- `clients:created` / `clients:deleted` - Logos clients
- `partners:updated` / `partners:created` / `partners:deleted` - Partenaires
- `status:updated` - État des services
- `incidents:created` / `incidents:deleted` - Incidents

**Résultat:** Quand un administrateur fait un changement, tous les autres navigateurs (y compris les visiteurs du site) voient la mise à jour instantanément sans recharger la page.

---

## 🛡️ Routes API

### Routes publiques (pas d'authentification)

- `GET /api/health` - Vérification de la santé de la DB
- `POST /api/auth/login` - Connexion
- `POST /api/test-db-connection` - Test de connexion DB
- `GET /api/settings` - Paramètres du site (lecture seule)
- `GET /api/posts` - Articles de blog
- `GET /api/jobs` - Offres d'emploi
- `GET /api/team` - Membres de l'équipe
- `GET /api/clients` - Logos clients
- `GET /api/partners/*` - Partenaires
- `GET /api/status` - État des services
- `GET /api/incidents` - Incidents

### Routes protégées (nécessitent un token JWT)

Toutes les opérations de modification (POST, PUT, DELETE) requièrent un header d'authentification :

```
Authorization: Bearer <token_jwt>
```

- `POST /api/auth/change-password` - Changer le mot de passe
- `GET /api/auth/verify` - Vérifier la validité du token
- `PUT /api/settings` - Modifier les paramètres
- `POST /api/posts` - Créer un article
- `DELETE /api/posts/:id` - Supprimer un article
- Et toutes les autres opérations de modification...

---

## 🚀 Démarrage

### 1. Installation des dépendances

**Backend :**
```bash
cd server
npm install
```

**Frontend :**
```bash
npm install
```

### 2. Configuration de la base de données

Créez un fichier `.env` dans le dossier `server/` :

```env
# Base de données PostgreSQL
DATABASE_URL=postgres://user:password@host:port/database

# OU utilisez les variables individuelles
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=votre_mot_de_passe
DB_NAME=novitec_db
DB_PORT=5432

# JWT Secret (changez en production!)
JWT_SECRET=votre-secret-jwt-tres-securise

# Port du serveur
PORT=3001

# URL du frontend (pour CORS)
FRONTEND_URL=http://localhost:5173

# Environnement
NODE_ENV=development
```

### 3. Démarrage du backend

```bash
cd server
npm start
```

Le backend démarrera sur `http://localhost:3001` et :
- Se connectera à PostgreSQL
- Créera automatiquement toutes les tables nécessaires
- Créera l'utilisateur admin par défaut
- Activera Socket.IO pour la synchronisation temps réel

### 4. Démarrage du frontend

```bash
npm run dev
```

Le frontend démarrera sur `http://localhost:5173`

---

## 🔑 Utilisation

### Première connexion

1. Accédez à `http://localhost:5173/#/admin/login`
2. Connectez-vous avec :
   - Username: `admin`
   - Password: `admin123`
3. Vous serez redirigé vers le panneau d'administration
4. **Allez immédiatement dans l'onglet "Sécurité"** et changez le mot de passe

### Changement de mot de passe

1. Dans le panneau admin, cliquez sur l'onglet **"Sécurité"**
2. Entrez votre mot de passe actuel
3. Entrez le nouveau mot de passe (minimum 6 caractères)
4. Confirmez le nouveau mot de passe
5. Cliquez sur "Changer le mot de passe"

### Protection des routes

- La route `/admin` est protégée automatiquement
- Si vous n'êtes pas connecté, vous serez redirigé vers `/admin/login`
- Le token JWT est valide pendant 24 heures
- Après 24 heures, vous devrez vous reconnecter

---

## 🧪 Test de la synchronisation temps réel

1. Connectez-vous au panneau admin dans **deux navigateurs différents** (ou deux onglets)
2. Dans le premier navigateur, faites une modification (ex: ajoutez un article de blog)
3. Observez dans le second navigateur : **la modification apparaît instantanément** sans recharger la page
4. Ouvrez également le site public (`http://localhost:5173`) : **les modifications sont visibles en temps réel** pour tous les visiteurs

---

## 📦 Technologies utilisées

### Backend
- **Express.js** - Framework web
- **PostgreSQL** - Base de données
- **bcrypt** - Hachage des mots de passe
- **jsonwebtoken** - Authentification JWT
- **Socket.IO** - Synchronisation temps réel
- **pg** - Driver PostgreSQL pour Node.js

### Frontend
- **React 19** - Framework UI
- **Socket.IO Client** - Client WebSocket
- **React Router** - Navigation
- **TypeScript** - Typage statique

---

## 🔒 Sécurité

### Mesures de sécurité implémentées :

1. ✅ **Mots de passe hachés** avec bcrypt (SALT_ROUNDS=10)
2. ✅ **Tokens JWT** avec expiration (24h)
3. ✅ **Middleware d'authentification** pour toutes les routes protégées
4. ✅ **Route guards** côté frontend
5. ✅ **CORS configuré** pour limiter les origines autorisées
6. ✅ **Headers d'authentification** sur toutes les requêtes de modification
7. ✅ **Validation** des mots de passe (minimum 6 caractères)

### Recommandations pour la production :

- ⚠️ Changez `JWT_SECRET` dans le fichier `.env`
- ⚠️ Utilisez HTTPS en production
- ⚠️ Configurez SSL pour PostgreSQL
- ⚠️ Limitez les origines CORS à votre domaine
- ⚠️ Implémentez rate limiting pour éviter les attaques par force brute
- ⚠️ Activez les logs de sécurité

---

## 🐛 Dépannage

### Erreur de connexion à la base de données

Vérifiez que :
- PostgreSQL est démarré
- Les informations de connexion dans `.env` sont correctes
- L'utilisateur PostgreSQL a les permissions nécessaires

### Token invalide ou expiré

- Le token JWT expire après 24 heures
- Reconnectez-vous via `/admin/login`

### Socket.IO ne se connecte pas

- Vérifiez que le backend est démarré
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que le port 3001 n'est pas bloqué par un pare-feu

---

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

**Bonne utilisation! 🎉**

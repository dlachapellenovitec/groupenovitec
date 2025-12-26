# 🔐 GUIDE COMPLET D'IMPLÉMENTATION 2FA

Ce guide vous permet d'implémenter la double authentification (2FA) complète pour votre panneau d'administration.

## ✅ Ce qui est déjà fait

- ✅ Packages installés (`speakeasy`, `qrcode`)
- ✅ Migration SQL créée (`server/migrations/add_2fa.sql`)
- ✅ Toutes les sections admin transformées avec markdown

## 📋 Étapes d'implémentation

### ÉTAPE 1 : Exécuter la migration SQL

**Dans votre terminal serveur:**

```bash
# Connectez-vous à PostgreSQL
docker exec -it groupenovitec-postgres-1 psql -U novitec_user -d novitec_db

# Exécutez la migration
\i /docker-entrypoint-initdb.d/add_2fa.sql
# OU copiez-collez le contenu depuis server/migrations/add_2fa.sql

# Vérifiez que les colonnes sont créées
\d admin

# Quittez
\q
```

### ÉTAPE 2 : Modifier `server/index.js` - Ajouter les imports

**Au début du fichier (après les autres imports) :**

```javascript
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
```

### ÉTAPE 3 : Modifier le endpoint de login

**Trouvez `app.post('/api/auth/login'` (ligne ~245) et remplacez par :**

```javascript
app.post('/api/auth/login', async (req, res) => {
  const { username, password, twoFactorToken } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM admin WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const admin = result.rows[0];
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Vérifier si 2FA est activé
    if (admin.two_factor_enabled) {
      if (!twoFactorToken) {
        return res.json({
          requiresTwoFactor: true,
          message: 'Code 2FA requis'
        });
      }

      // Vérifier le code TOTP
      const verified = speakeasy.totp.verify({
        secret: admin.two_factor_secret,
        encoding: 'base32',
        token: twoFactorToken,
        window: 2
      });

      if (!verified) {
        return res.status(401).json({ error: 'Code 2FA invalide' });
      }
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
```

### ÉTAPE 4 : Ajouter les endpoints 2FA

**Après le endpoint de login, ajoutez :**

```javascript
// ============= ENDPOINTS 2FA =============

// Générer un secret 2FA et le QR code
app.post('/api/admin/2fa/setup', authenticateToken, async (req, res) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `Groupe Novitec Admin (${req.user.username})`,
      length: 32
    });

    // Sauvegarder le secret temporaire (pas encore activé)
    await pool.query(
      'UPDATE admin SET two_factor_secret = $1 WHERE id = $2',
      [secret.base32, req.user.id]
    );

    // Générer le QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      secret: secret.base32,
      qrCode: qrCodeUrl
    });
  } catch (error) {
    console.error('Erreur setup 2FA:', error);
    res.status(500).json({ error: 'Erreur lors de la configuration 2FA' });
  }
});

// Vérifier le code et activer la 2FA
app.post('/api/admin/2fa/verify', authenticateToken, async (req, res) => {
  const { token } = req.body;

  try {
    const result = await pool.query(
      'SELECT two_factor_secret FROM admin WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const secret = result.rows[0].two_factor_secret;

    if (!secret) {
      return res.status(400).json({ error: 'Configurez d\'abord la 2FA' });
    }

    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2
    });

    if (verified) {
      await pool.query(
        'UPDATE admin SET two_factor_enabled = TRUE WHERE id = $1',
        [req.user.id]
      );
      res.json({ success: true, message: '2FA activée avec succès' });
    } else {
      res.status(400).json({ error: 'Code invalide, réessayez' });
    }
  } catch (error) {
    console.error('Erreur vérification 2FA:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Désactiver la 2FA
app.post('/api/admin/2fa/disable', authenticateToken, async (req, res) => {
  const { password } = req.body;

  try {
    const result = await pool.query(
      'SELECT password FROM admin WHERE id = $1',
      [req.user.id]
    );

    const validPassword = await bcrypt.compare(password, result.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    await pool.query(
      'UPDATE admin SET two_factor_enabled = FALSE, two_factor_secret = NULL WHERE id = $1',
      [req.user.id]
    );

    res.json({ success: true, message: '2FA désactivée' });
  } catch (error) {
    console.error('Erreur désactivation 2FA:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Vérifier le statut 2FA
app.get('/api/admin/2fa/status', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT two_factor_enabled FROM admin WHERE id = $1',
      [req.user.id]
    );

    res.json({
      enabled: result.rows[0]?.two_factor_enabled || false
    });
  } catch (error) {
    console.error('Erreur statut 2FA:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
```

### ÉTAPE 5 : Frontend - Modifier `pages/AdminLogin.tsx`

**Trouvez la fonction `handleLogin` et remplacez par :**

```typescript
const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
const [twoFactorCode, setTwoFactorCode] = useState('');

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const payload: any = { username, password };

    if (requiresTwoFactor) {
      payload.twoFactorToken = twoFactorCode;
    }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.requiresTwoFactor) {
      setRequiresTwoFactor(true);
      setLoading(false);
      return;
    }

    if (!response.ok) {
      throw new Error(data.error || 'Erreur de connexion');
    }

    localStorage.setItem('admin_token', data.token);
    navigate('/admin');
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

**Dans le JSX du formulaire, ajoutez après le champ password :**

```tsx
{requiresTwoFactor && (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-2">
      Code 2FA (6 chiffres)
    </label>
    <input
      type="text"
      value={twoFactorCode}
      onChange={e => setTwoFactorCode(e.target.value)}
      maxLength={6}
      className="w-full p-3 border border-slate-300 rounded-xl text-center text-2xl font-mono"
      placeholder="000000"
      autoFocus
      required
    />
    <p className="text-xs text-slate-500 mt-2">
      Entrez le code de votre application d'authentification
    </p>
  </div>
)}
```

### ÉTAPE 6 : Frontend - Ajouter l'interface 2FA dans `pages/Admin.tsx`

**Dans la section Security, ajoutez ces états (après les autres states) :**

```typescript
const [twoFactorSetup, setTwoFactorSetup] = useState<{qrCode: string; secret: string} | null>(null);
const [twoFactorStatus, setTwoFactorStatus] = useState<{enabled: boolean}>({enabled: false});
const [verifyToken, setVerifyToken] = useState('');
const [disablePassword, setDisablePassword] = useState('');
```

**Ajoutez ces fonctions (après les autres handlers) :**

```typescript
// Charger le statut 2FA au montage
useEffect(() => {
  const loadTwoFactorStatus = async () => {
    try {
      const response = await fetch('/api/admin/2fa/status', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setTwoFactorStatus(data);
      }
    } catch (error) {
      console.error('Erreur chargement statut 2FA:', error);
    }
  };
  loadTwoFactorStatus();
}, []);

const handleSetup2FA = async () => {
  try {
    const response = await fetch('/api/admin/2fa/setup', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    });
    const data = await response.json();
    setTwoFactorSetup(data);
  } catch (error) {
    alert('Erreur lors de la configuration 2FA');
  }
};

const handleVerify2FA = async () => {
  try {
    const response = await fetch('/api/admin/2fa/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify({ token: verifyToken })
    });

    const data = await response.json();

    if (response.ok) {
      alert('2FA activée avec succès !');
      setTwoFactorSetup(null);
      setVerifyToken('');
      setTwoFactorStatus({ enabled: true });
    } else {
      alert(data.error || 'Code invalide');
    }
  } catch (error) {
    alert('Erreur lors de la vérification');
  }
};

const handleDisable2FA = async () => {
  if (!confirm('Voulez-vous vraiment désactiver la 2FA ?')) return;

  try {
    const response = await fetch('/api/admin/2fa/disable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`
      },
      body: JSON.stringify({ password: disablePassword })
    });

    const data = await response.json();

    if (response.ok) {
      alert('2FA désactivée');
      setDisablePassword('');
      setTwoFactorStatus({ enabled: false });
    } else {
      alert(data.error || 'Erreur');
    }
  } catch (error) {
    alert('Erreur lors de la désactivation');
  }
};
```

**Dans le JSX de la section Security, ajoutez :**

```tsx
{/* Section 2FA */}
<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <Shield className="w-6 h-6" />
        Authentification à Deux Facteurs (2FA)
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Protégez votre compte avec une double authentification
      </p>
    </div>
    {twoFactorStatus.enabled ? (
      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4" />
        Activée
      </span>
    ) : (
      <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-bold">
        Désactivée
      </span>
    )}
  </div>

  {!twoFactorStatus.enabled ? (
    !twoFactorSetup ? (
      <div className="text-center py-8">
        <p className="text-slate-600 mb-6">
          La double authentification ajoute une couche de sécurité supplémentaire à votre compte.
        </p>
        <button
          onClick={handleSetup2FA}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors inline-flex items-center gap-2"
        >
          <Shield className="w-5 h-5" />
          Activer la 2FA
        </button>
      </div>
    ) : (
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900 font-medium mb-2">📱 Étape 1 : Scannez le QR code</p>
          <p className="text-xs text-blue-700">
            Utilisez Google Authenticator, Authy, ou toute application TOTP
          </p>
        </div>

        <div className="flex justify-center">
          <img src={twoFactorSetup.qrCode} alt="QR Code 2FA" className="w-64 h-64 border-4 border-slate-200 rounded-xl" />
        </div>

        <div className="bg-slate-50 p-4 rounded-xl">
          <p className="text-xs text-slate-500 mb-1">Code secret (si le QR ne fonctionne pas) :</p>
          <code className="text-sm font-mono bg-white px-3 py-2 rounded border border-slate-200 block text-center">
            {twoFactorSetup.secret}
          </code>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Étape 2 : Entrez le code à 6 chiffres
          </label>
          <input
            type="text"
            value={verifyToken}
            onChange={e => setVerifyToken(e.target.value.replace(/\D/g, ''))}
            maxLength={6}
            className="w-full p-4 border-2 border-slate-300 rounded-xl text-center text-3xl font-mono tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            placeholder="000000"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setTwoFactorSetup(null);
              setVerifyToken('');
            }}
            className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleVerify2FA}
            disabled={verifyToken.length !== 6}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Vérifier et Activer
          </button>
        </div>
      </div>
    )
  ) : (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-900 font-medium">
          ✅ Votre compte est protégé par la double authentification
        </p>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <p className="text-sm font-bold text-slate-700 mb-3">Désactiver la 2FA</p>
        <div className="flex gap-4">
          <input
            type="password"
            value={disablePassword}
            onChange={e => setDisablePassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="flex-1 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-200 outline-none"
          />
          <button
            onClick={handleDisable2FA}
            disabled={!disablePassword}
            className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Désactiver
          </button>
        </div>
      </div>
    </div>
  )}
</div>
```

## 🚀 Déploiement avec Docker Compose V2

**Votre `docker-compose.yml` (version V2 - sans tirets) :**

```bash
docker compose down
docker compose up -d --build
```

## ✅ Checklist finale

- [ ] Migration SQL exécutée
- [ ] server/index.js modifié (imports + endpoints)
- [ ] AdminLogin.tsx modifié (champ 2FA)
- [ ] Admin.tsx modifié (interface 2FA complète)
- [ ] `npm install` exécuté
- [ ] Docker rebuild et redémarrage
- [ ] Test de la 2FA avec Google Authenticator

## 📱 Applications recommandées

- **Google Authenticator** (iOS/Android)
- **Authy** (iOS/Android/Desktop)
- **Microsoft Authenticator** (iOS/Android)

---

**Toutes les sections sont maintenant prêtes avec markdown et modification !** 🎉

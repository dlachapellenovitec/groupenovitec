
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-changez-moi-en-production';
const SALT_ROUNDS = 10;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: false  // Désactiver SSL pour Docker (PostgreSQL Alpine)
    }
  : {
      user: process.env.DB_USER || 'novitec_user',
      host: process.env.DB_HOST || 'postgres',
      database: process.env.DB_NAME || 'novitec_db',
      password: process.env.DB_PASSWORD || 'changeme_db_password',
      port: process.env.DB_PORT || 5432,
      ssl: false
    };

const pool = new Pool(poolConfig);

// ============= MIDDLEWARE D'AUTHENTIFICATION =============

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token d\'authentification requis' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
    req.user = user;
    next();
  });
};

// ============= INITIALISATION DE LA BASE DE DONNÉES =============

const initDb = async () => {
  console.log('⏳ Tentative de connexion à la base de données...');
  try {
    const client = await pool.connect();
    console.log('✅ Connecté à PostgreSQL avec succès');

    // Création de toutes les tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT,
        two_factor_secret TEXT,
        two_factor_enabled BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        company_name TEXT DEFAULT 'GROUPE NOVITEC',
        phone TEXT DEFAULT '514-360-1757',
        email TEXT DEFAULT 'support@novitec.ca',
        address TEXT DEFAULT '3361 avenue de la Gare, Suite 122',
        city TEXT DEFAULT 'Mascouche, Qc, J7K 3C1',
        logo_url TEXT,
        linkedin_url TEXT DEFAULT '#',
        facebook_url TEXT DEFAULT '#',
        announcement JSONB DEFAULT '{"active": false, "message": "", "type": "info"}'
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT,
        category TEXT,
        author TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS job_postings (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        location TEXT,
        type TEXT,
        summary TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT,
        bio TEXT,
        image_url TEXT,
        linkedin_url TEXT,
        quote TEXT
      );

      CREATE TABLE IF NOT EXISTS client_logos (
        id SERIAL PRIMARY KEY,
        name TEXT,
        logo_url TEXT
      );

      CREATE TABLE IF NOT EXISTS strategic_partners (
        id SERIAL PRIMARY KEY,
        name TEXT,
        role TEXT,
        description TEXT,
        logo_url TEXT,
        badge_text TEXT,
        theme_color TEXT
      );

      CREATE TABLE IF NOT EXISTS standard_partners (
        id SERIAL PRIMARY KEY,
        name TEXT,
        category TEXT,
        description TEXT,
        logo_url TEXT
      );

      CREATE TABLE IF NOT EXISTS system_status (
        id SERIAL PRIMARY KEY,
        category TEXT,
        name TEXT,
        status TEXT DEFAULT 'operational',
        uptime TEXT DEFAULT '100%',
        note TEXT
      );

      CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL PRIMARY KEY,
        date_str TEXT,
        title TEXT,
        message TEXT,
        severity TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS company_story (
        id SERIAL PRIMARY KEY,
        founding_year TEXT DEFAULT '2018',
        intro TEXT,
        mission TEXT,
        vision TEXT
      );
    `);

    console.log('📦 Structure de la base de données vérifiée');

    // Initialiser les réglages par défaut
    const settingsCheck = await client.query('SELECT id FROM site_settings WHERE id = 1');
    if (settingsCheck.rows.length === 0) {
      await client.query('INSERT INTO site_settings (id) VALUES (1)');
      console.log('ℹ️ Réglages par défaut initialisés');
    }

    // Créer un utilisateur admin par défaut si aucun utilisateur n'existe
    const userCheck = await client.query('SELECT id FROM users LIMIT 1');
    if (userCheck.rows.length === 0) {
      const defaultPassword = 'admin123'; // Mot de passe temporaire à changer
      const hashedPassword = await bcrypt.hash(defaultPassword, SALT_ROUNDS);
      await client.query(
        'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)',
        ['admin', hashedPassword, 'admin@novitec.ca']
      );
      console.log('👤 Utilisateur admin créé par défaut');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      console.log('   ⚠️  CHANGEZ CE MOT DE PASSE IMMÉDIATEMENT!');
    }

    client.release();
  } catch (err) {
    console.error('❌ ERREUR CRITIQUE BASE DE DONNÉES :', err.message);
  }
};

initDb();

// ============= WEBSOCKET POUR SYNCHRONISATION TEMPS RÉEL =============

io.on('connection', (socket) => {
  console.log('🔌 Client connecté:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔌 Client déconnecté:', socket.id);
  });
});

// Fonction helper pour notifier tous les clients d'un changement
const notifyClients = (event, data) => {
  io.emit(event, data);
  console.log(`📡 Notification envoyée: ${event}`);
};

// ============= ROUTES D'AUTHENTIFICATION (PUBLIQUES) =============

// Health Check (public)
app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    res.json({ status: 'ok', database: 'connected', timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', message: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password, twoFactorCode } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username et password requis' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Vérifier si 2FA est activé
    if (user.two_factor_enabled) {
      if (!twoFactorCode) {
        // Demander le code 2FA
        return res.json({
          requires2FA: true,
          message: 'Code d\'authentification à deux facteurs requis'
        });
      }

      // Vérifier le code TOTP
      const verified = speakeasy.totp.verify({
        secret: user.two_factor_secret,
        encoding: 'base32',
        token: twoFactorCode,
        window: 2 // Accepter les codes avec une marge de ±2 intervalles (60 secondes)
      });

      if (!verified) {
        return res.status(401).json({ error: 'Code d\'authentification invalide' });
      }
    }

    // Mettre à jour la dernière connexion
    await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    // Créer le token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        twoFactorEnabled: user.two_factor_enabled
      }
    });
  } catch (err) {
    console.error('Erreur de login:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Vérifier le token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Changer le mot de passe (protégé)
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Mot de passe actuel et nouveau requis' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashedNewPassword, user.id]);

    res.json({ success: true, message: 'Mot de passe changé avec succès' });
  } catch (err) {
    console.error('Erreur de changement de mot de passe:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ============= ENDPOINTS 2FA =============

// Configurer 2FA - Générer le secret et le QR code
app.post('/api/admin/2fa/setup', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Générer un nouveau secret
    const secret = speakeasy.generateSecret({
      name: `Groupe Novitec (${user.username})`,
      issuer: 'Groupe Novitec'
    });

    // Générer le QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    // Sauvegarder le secret (mais ne pas encore activer 2FA)
    await pool.query(
      'UPDATE users SET two_factor_secret = $1 WHERE id = $2',
      [secret.base32, user.id]
    );

    res.json({
      success: true,
      secret: secret.base32,
      qrCode: qrCodeUrl
    });
  } catch (err) {
    console.error('Erreur setup 2FA:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Vérifier et activer 2FA
app.post('/api/admin/2fa/verify', authenticateToken, async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Code de vérification requis' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (!user || !user.two_factor_secret) {
      return res.status(400).json({ error: 'Configuration 2FA non trouvée' });
    }

    // Vérifier le code
    const verified = speakeasy.totp.verify({
      secret: user.two_factor_secret,
      encoding: 'base32',
      token: token,
      window: 2
    });

    if (!verified) {
      return res.status(401).json({ error: 'Code invalide' });
    }

    // Activer 2FA
    await pool.query(
      'UPDATE users SET two_factor_enabled = TRUE WHERE id = $1',
      [user.id]
    );

    res.json({
      success: true,
      message: 'Double authentification activée avec succès'
    });
  } catch (err) {
    console.error('Erreur vérification 2FA:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Désactiver 2FA
app.post('/api/admin/2fa/disable', authenticateToken, async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Mot de passe requis' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Désactiver 2FA et supprimer le secret
    await pool.query(
      'UPDATE users SET two_factor_enabled = FALSE, two_factor_secret = NULL WHERE id = $1',
      [user.id]
    );

    res.json({
      success: true,
      message: 'Double authentification désactivée'
    });
  } catch (err) {
    console.error('Erreur désactivation 2FA:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Obtenir le statut 2FA
app.get('/api/admin/2fa/status', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT two_factor_enabled FROM users WHERE id = $1',
      [req.user.id]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({
      enabled: user.two_factor_enabled || false
    });
  } catch (err) {
    console.error('Erreur statut 2FA:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// TEST DE CONNEXION (Reçoit une URL de DB et tente de s'y connecter) - Public pour configuration initiale
app.post('/api/test-db-connection', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL manquante' });

    const testPool = new Pool({
        connectionString: url,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
    });

    try {
        const client = await testPool.connect();
        await client.query('SELECT 1');
        client.release();
        await testPool.end();
        res.json({ success: true, message: 'Connexion réussie !' });
    } catch (err) {
        await testPool.end();
        res.status(500).json({ success: false, error: err.message });
    }
});

// ============= ROUTES PROTÉGÉES =============

// Settings
app.get('/api/settings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM site_settings WHERE id = 1');
    const s = rows[0] || {};
    res.json({
      companyName: s.company_name || 'GROUPE NOVITEC',
      phone: s.phone || '514-360-1757',
      email: s.email || 'support@novitec.ca',
      address: s.address || '',
      city: s.city || '',
      logoUrl: s.logo_url || '',
      linkedinUrl: s.linkedin_url || '#',
      facebookUrl: s.facebook_url || '#',
      announcement: s.announcement || { active: false, message: '', type: 'info' }
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/settings', authenticateToken, async (req, res) => {
  const s = req.body;
  try {
    await pool.query(
      `UPDATE site_settings SET company_name=$1, phone=$2, email=$3, address=$4, city=$5, logo_url=$6, linkedin_url=$7, facebook_url=$8, announcement=$9 WHERE id=1`,
      [s.companyName, s.phone, s.email, s.address, s.city, s.logoUrl, s.linkedinUrl, s.facebookUrl, JSON.stringify(s.announcement)]
    );
    notifyClients('settings:updated', s);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Blog Posts
app.get('/api/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(rows.map(r => ({
      ...r,
      id: r.id.toString(),
      imageUrl: r.image_url,
      date: new Date(r.created_at).toLocaleDateString('fr-CA')
    })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/posts', authenticateToken, async (req, res) => {
  const { title, excerpt, content, category, author, imageUrl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO blog_posts (title, excerpt, content, category, author, image_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [title, excerpt, content, category, author, imageUrl]
    );
    notifyClients('posts:created', result.rows[0]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { title, excerpt, content, category, author, imageUrl } = req.body;
    const result = await pool.query(
      'UPDATE blog_posts SET title = $1, excerpt = $2, content = $3, category = $4, author = $5, image_url = $6 WHERE id = $7 RETURNING *',
      [title, excerpt, content, category, author, imageUrl, req.params.id]
    );
    notifyClients('posts:updated', result.rows[0]);
    res.json({ success: true, post: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    notifyClients('posts:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM job_postings ORDER BY created_at DESC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/jobs', authenticateToken, async (req, res) => {
  const { title, location, type, summary } = req.body;
  try {
    await pool.query('INSERT INTO job_postings (title, location, type, summary) VALUES ($1,$2,$3,$4)', [title, location, type, summary]);
    notifyClients('jobs:created', req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/jobs/:id', authenticateToken, async (req, res) => {
  const { title, location, type, summary } = req.body;
  try {
    const result = await pool.query(
      'UPDATE job_postings SET title = $1, location = $2, type = $3, summary = $4 WHERE id = $5 RETURNING *',
      [title, location, type, summary, req.params.id]
    );
    notifyClients('jobs:updated', result.rows[0]);
    res.json({ success: true, job: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/jobs/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM job_postings WHERE id = $1', [req.params.id]);
    notifyClients('jobs:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Team
app.get('/api/team', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_members ORDER BY id ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), imageUrl: r.image_url, linkedinUrl: r.linkedin_url })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/team', authenticateToken, async (req, res) => {
  const { name, role, bio, imageUrl, linkedinUrl, quote } = req.body;
  try {
    await pool.query('INSERT INTO team_members (name, role, bio, image_url, linkedin_url, quote) VALUES ($1,$2,$3,$4,$5,$6)', [name, role, bio, imageUrl, linkedinUrl, quote]);
    notifyClients('team:created', req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/team/:id', authenticateToken, async (req, res) => {
  const { name, role, bio, imageUrl, linkedinUrl, quote } = req.body;
  try {
    const result = await pool.query(
      'UPDATE team_members SET name = $1, role = $2, bio = $3, image_url = $4, linkedin_url = $5, quote = $6 WHERE id = $7 RETURNING *',
      [name, role, bio, imageUrl, linkedinUrl, quote, req.params.id]
    );
    notifyClients('team:updated', result.rows[0]);
    res.json({ success: true, member: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/team/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM team_members WHERE id = $1', [req.params.id]);
    notifyClients('team:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// System Status
app.get('/api/status', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM system_status ORDER BY category, name ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/status/:id', authenticateToken, async (req, res) => {
  const { status, note } = req.body;
  try {
    await pool.query('UPDATE system_status SET status = $1, note = $2 WHERE id = $3', [status, note, req.params.id]);
    notifyClients('status:updated', { id: req.params.id, status, note });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Partners - Strategic
app.get('/api/partners/strategic', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM strategic_partners ORDER BY id ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), logoUrl: r.logo_url, badgeText: r.badge_text, themeColor: r.theme_color })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/partners/strategic/:id', authenticateToken, async (req, res) => {
  const p = req.body;
  try {
    await pool.query(
      'UPDATE strategic_partners SET name=$1, role=$2, description=$3, logo_url=$4, badge_text=$5, theme_color=$6 WHERE id=$7',
      [p.name, p.role, p.description, p.logoUrl, p.badgeText, p.themeColor, req.params.id]
    );
    notifyClients('partners:updated', p);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Partners - Standard
app.get('/api/partners/standard', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM standard_partners ORDER BY category, name ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), logoUrl: r.logo_url })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/partners/standard', authenticateToken, async (req, res) => {
  const { name, category, description, logoUrl } = req.body;
  try {
    await pool.query('INSERT INTO standard_partners (name, category, description, logo_url) VALUES ($1,$2,$3,$4)', [name, category, description, logoUrl]);
    notifyClients('partners:created', req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/partners/standard/:id', authenticateToken, async (req, res) => {
  const { name, category, description, logoUrl } = req.body;
  try {
    const result = await pool.query(
      'UPDATE standard_partners SET name = $1, category = $2, description = $3, logo_url = $4 WHERE id = $5 RETURNING *',
      [name, category, description, logoUrl, req.params.id]
    );
    notifyClients('partners:updated', result.rows[0]);
    res.json({ success: true, partner: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/partners/standard/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM standard_partners WHERE id = $1', [req.params.id]);
    notifyClients('partners:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Clients
app.get('/api/clients', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM client_logos ORDER BY id ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), logoUrl: r.logo_url })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/clients', authenticateToken, async (req, res) => {
  const { name, logoUrl } = req.body;
  try {
    await pool.query('INSERT INTO client_logos (name, logo_url) VALUES ($1, $2)', [name, logoUrl]);
    notifyClients('clients:created', req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/clients/:id', authenticateToken, async (req, res) => {
  const { name, logoUrl } = req.body;
  try {
    const result = await pool.query(
      'UPDATE client_logos SET name = $1, logo_url = $2 WHERE id = $3 RETURNING *',
      [name, logoUrl, req.params.id]
    );
    notifyClients('clients:updated', result.rows[0]);
    res.json({ success: true, client: result.rows[0] });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/clients/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM client_logos WHERE id = $1', [req.params.id]);
    notifyClients('clients:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Incidents
app.get('/api/incidents', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM incidents ORDER BY created_at DESC LIMIT 10');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), date: r.date_str })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/incidents', authenticateToken, async (req, res) => {
  const { date, title, message, severity } = req.body;
  try {
    await pool.query('INSERT INTO incidents (date_str, title, message, severity) VALUES ($1, $2, $3, $4)', [date, title, message, severity]);
    notifyClients('incidents:created', req.body);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/incidents/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM incidents WHERE id = $1', [req.params.id]);
    notifyClients('incidents:deleted', { id: req.params.id });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ============= ROUTES STATIC (FRONTEND) =============

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// ============= DÉMARRAGE DU SERVEUR =============

server.listen(PORT, () => {
  console.log(`🚀 Serveur NOVITEC lancé sur le port ${PORT}`);
  console.log(`🔐 Authentification JWT activée`);
  console.log(`🔌 WebSocket (Socket.IO) activé pour synchronisation temps réel`);
});

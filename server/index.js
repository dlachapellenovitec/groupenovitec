
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const poolConfig = process.env.DATABASE_URL 
  ? { 
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    }
  : {
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'novitec_db',
      password: process.env.DB_PASSWORD || 'password',
      port: process.env.DB_PORT || 5432,
    };

const pool = new Pool(poolConfig);

const initDb = async () => {
  console.log('⏳ Tentative de connexion à la base de données...');
  try {
    const client = await pool.connect();
    console.log('✅ Connecté à PostgreSQL avec succès');

    await client.query(`
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
    `);

    console.log('📦 Structure de la base de données vérifiée');

    const settingsCheck = await client.query('SELECT id FROM site_settings WHERE id = 1');
    if (settingsCheck.rows.length === 0) {
      await client.query('INSERT INTO site_settings (id) VALUES (1)');
      console.log('ℹ️ Réglages par défaut initialisés');
    }

    client.release();
  } catch (err) {
    console.error('❌ ERREUR CRITIQUE BASE DE DONNÉES :', err.message);
  }
};

initDb();

// --- API ROUTES ---

// Health Check
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

// TEST DE CONNEXION (Reçoit une URL de DB et tente de s'y connecter)
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

app.put('/api/settings', async (req, res) => {
  const s = req.body;
  try {
    await pool.query(
      `UPDATE site_settings SET company_name=$1, phone=$2, email=$3, address=$4, city=$5, logo_url=$6, linkedin_url=$7, facebook_url=$8, announcement=$9 WHERE id=1`,
      [s.companyName, s.phone, s.email, s.address, s.city, s.logoUrl, s.linkedinUrl, s.facebookUrl, JSON.stringify(s.announcement)]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

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

app.post('/api/posts', async (req, res) => {
  const { title, excerpt, content, category, author, imageUrl } = req.body;
  try {
    await pool.query(
      'INSERT INTO blog_posts (title, excerpt, content, category, author, image_url) VALUES ($1,$2,$3,$4,$5,$6)',
      [title, excerpt, content, category, author, imageUrl]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM job_postings ORDER BY created_at DESC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/jobs', async (req, res) => {
  const { title, location, type, summary } = req.body;
  try {
    await pool.query('INSERT INTO job_postings (title, location, type, summary) VALUES ($1,$2,$3,$4)', [title, location, type, summary]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM job_postings WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/team', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_members ORDER BY id ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), imageUrl: r.image_url, linkedinUrl: r.linkedin_url })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/team', async (req, res) => {
  const { name, role, bio, imageUrl, linkedinUrl, quote } = req.body;
  try {
    await pool.query('INSERT INTO team_members (name, role, bio, image_url, linkedin_url, quote) VALUES ($1,$2,$3,$4,$5,$6)', [name, role, bio, imageUrl, linkedinUrl, quote]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM team_members WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/status', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM system_status ORDER BY category, name ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString() })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/status/:id', async (req, res) => {
  const { status, note } = req.body;
  try {
    await pool.query('UPDATE system_status SET status = $1, note = $2 WHERE id = $3', [status, note, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/partners/strategic', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM strategic_partners ORDER BY id ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), logoUrl: r.logo_url, badgeText: r.badge_text, themeColor: r.theme_color })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/partners/strategic/:id', async (req, res) => {
  const p = req.body;
  try {
    await pool.query(
      'UPDATE strategic_partners SET name=$1, role=$2, description=$3, logo_url=$4, badge_text=$5, theme_color=$6 WHERE id=$7',
      [p.name, p.role, p.description, p.logoUrl, p.badgeText, p.themeColor, req.params.id]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/partners/standard', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM standard_partners ORDER BY category, name ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), logoUrl: r.logo_url })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/partners/standard', async (req, res) => {
  const { name, category, description, logoUrl } = req.body;
  try {
    await pool.query('INSERT INTO standard_partners (name, category, description, logo_url) VALUES ($1,$2,$3,$4)', [name, category, description, logoUrl]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/partners/standard/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM standard_partners WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/clients', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM client_logos ORDER BY id ASC');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), logoUrl: r.logo_url })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/clients', async (req, res) => {
  const { name, logoUrl } = req.body;
  try {
    await pool.query('INSERT INTO client_logos (name, logo_url) VALUES ($1, $2)', [name, logoUrl]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM client_logos WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/incidents', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM incidents ORDER BY created_at DESC LIMIT 10');
    res.json(rows.map(r => ({ ...r, id: r.id.toString(), date: r.date_str })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/incidents', async (req, res) => {
  const { date, title, message, severity } = req.body;
  try {
    await pool.query('INSERT INTO incidents (date_str, title, message, severity) VALUES ($1, $2, $3, $4)', [date, title, message, severity]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/incidents/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM incidents WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur NOVITEC lancé sur le port ${PORT}`);
});

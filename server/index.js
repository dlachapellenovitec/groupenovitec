const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection (cPanel Optimized)
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'novitec_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// --- ROUTES API ---

// 1. SETTINGS
app.get('/api/settings', async (req, res) => {
  try {
    const results = await query('SELECT * FROM site_settings WHERE id = 1');
    const s = results[0] || {};
    res.json({
      ...s,
      announcement: {
        active: !!s.announcement_active,
        message: s.announcement_message,
        type: s.announcement_type
      }
    });
  } catch (e) { res.status(500).send(e); }
});

app.put('/api/settings', async (req, res) => {
  try {
    const { companyName, phone, email, address, city, announcement } = req.body;
    await query(
      'UPDATE site_settings SET companyName=?, phone=?, email=?, address=?, city=?, announcement_active=?, announcement_message=?, announcement_type=? WHERE id=1',
      [companyName, phone, email, address, city, announcement.active ? 1 : 0, announcement.message, announcement.type]
    );
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 2. BLOG POSTS
app.get('/api/posts', async (req, res) => {
  try {
    const results = await query('SELECT * FROM posts ORDER BY id DESC');
    res.json(results);
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, excerpt, content, category, author, date, imageUrl } = req.body;
    const result = await query(
      'INSERT INTO posts (title, excerpt, content, category, author, date, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, excerpt, content, category, author, date, imageUrl]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 3. CAREERS (JOBS)
app.get('/api/jobs', async (req, res) => {
  try {
    const results = await query('SELECT * FROM jobs ORDER BY id DESC');
    res.json(results);
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const { title, location, type, summary } = req.body;
    const result = await query(
      'INSERT INTO jobs (title, location, type, summary) VALUES (?, ?, ?, ?)',
      [title, location, type, summary]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await query('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 4. TEAM
app.get('/api/team', async (req, res) => {
  try {
    const results = await query('SELECT * FROM team');
    res.json(results);
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/team', async (req, res) => {
  try {
    const { name, role, bio, imageUrl, linkedinUrl, quote } = req.body;
    const result = await query(
      'INSERT INTO team (name, role, bio, imageUrl, linkedinUrl, quote) VALUES (?, ?, ?, ?, ?, ?)',
      [name, role, bio, imageUrl, linkedinUrl, quote]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).send(e); }
});

// 5. STATUS & INCIDENTS
app.get('/api/status', async (req, res) => {
  try {
    const results = await query('SELECT * FROM system_status');
    res.json(results);
  } catch (e) { res.status(500).send(e); }
});

app.put('/api/status/:id', async (req, res) => {
  try {
    const { status, note } = req.body;
    await query('UPDATE system_status SET status = ?, note = ? WHERE id = ?', [status, note, req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

app.get('/api/incidents', async (req, res) => {
  try {
    const results = await query('SELECT * FROM incidents ORDER BY id DESC LIMIT 10');
    res.json(results);
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/incidents', async (req, res) => {
  try {
    const { date, title, message, severity } = req.body;
    const result = await query('INSERT INTO incidents (date, title, message, severity) VALUES (?, ?, ?, ?)', [date, title, message, severity]);
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).send(e); }
});

// 6. PARTNERS
app.get('/api/partners/standard', async (req, res) => {
  try {
    const results = await query('SELECT * FROM standard_partners');
    res.json(results);
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/partners/standard', async (req, res) => {
  try {
    const { name, category, description, logoUrl } = req.body;
    const result = await query(
      'INSERT INTO standard_partners (name, category, description, logoUrl) VALUES (?, ?, ?, ?)',
      [name, category, description, logoUrl]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
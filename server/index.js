const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// CRITICAL FIX: Use environment port for cPanel/CloudLinux
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
// Ensure these match your cPanel MySQL Database credentials
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || 'novitec_db'
});

// --- HELPER FUNCTIONS ---
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// --- ROUTES ---

// 1. POSTS
app.get('/api/posts', async (req, res) => {
  try {
    const results = await query('SELECT * FROM posts ORDER BY id DESC');
    const formatted = results.map(r => ({...r, id: r.id.toString()}));
    res.json(formatted);
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, excerpt, content, category, author, date, imageUrl } = req.body;
    const result = await query(
      'INSERT INTO posts (title, excerpt, content, category, author, date, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, excerpt, content, category, author, date, imageUrl]
    );
    res.json({ id: result.insertId.toString(), ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 2. JOBS
app.get('/api/jobs', async (req, res) => {
  try {
    const results = await query('SELECT * FROM jobs');
    res.json(results.map(r => ({...r, id: r.id.toString()})));
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const { title, location, type, summary } = req.body;
    const result = await query(
      'INSERT INTO jobs (title, location, type, summary) VALUES (?, ?, ?, ?)',
      [title, location, type, summary]
    );
    res.json({ id: result.insertId.toString(), ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await query('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 3. TEAM MEMBERS
app.get('/api/team', async (req, res) => {
  try {
    const results = await query('SELECT * FROM team_members');
    res.json(results.map(r => ({...r, id: r.id.toString()})));
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/team', async (req, res) => {
  try {
    const { name, role, bio, imageUrl, linkedinUrl, quote } = req.body;
    const result = await query(
      'INSERT INTO team_members (name, role, bio, imageUrl, linkedinUrl, quote) VALUES (?, ?, ?, ?, ?, ?)',
      [name, role, bio, imageUrl, linkedinUrl, quote]
    );
    res.json({ id: result.insertId.toString(), ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    await query('DELETE FROM team_members WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 4. CLIENT LOGOS
app.get('/api/clients', async (req, res) => {
  try {
    const results = await query('SELECT * FROM client_logos');
    res.json(results.map(r => ({...r, id: r.id.toString()})));
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/clients', async (req, res) => {
  try {
    const { name, logoUrl } = req.body;
    const result = await query(
      'INSERT INTO client_logos (name, logoUrl) VALUES (?, ?)',
      [name, logoUrl]
    );
    res.json({ id: result.insertId.toString(), ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    await query('DELETE FROM client_logos WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 5. STRATEGIC PARTNERS
app.get('/api/partners/strategic', async (req, res) => {
  try {
    const results = await query('SELECT * FROM strategic_partners');
    res.json(results.map(r => ({...r, id: r.id.toString()})));
  } catch (e) { res.status(500).send(e); }
});

app.put('/api/partners/strategic/:id', async (req, res) => {
  try {
    const { name, role, description, logoUrl, badgeText, themeColor } = req.body;
    await query(
      'UPDATE strategic_partners SET name=?, role=?, description=?, logoUrl=?, badgeText=?, themeColor=? WHERE id=?',
      [name, role, description, logoUrl, badgeText, themeColor, req.params.id]
    );
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 6. STANDARD PARTNERS
app.get('/api/partners/standard', async (req, res) => {
  try {
    const results = await query('SELECT * FROM standard_partners');
    res.json(results.map(r => ({...r, id: r.id.toString()})));
  } catch (e) { res.status(500).send(e); }
});

app.post('/api/partners/standard', async (req, res) => {
  try {
    const { name, category, description, logoUrl } = req.body;
    const result = await query(
      'INSERT INTO standard_partners (name, category, description, logoUrl) VALUES (?, ?, ?, ?)',
      [name, category, description, logoUrl]
    );
    res.json({ id: result.insertId.toString(), ...req.body });
  } catch (e) { res.status(500).send(e); }
});

app.delete('/api/partners/standard/:id', async (req, res) => {
  try {
    await query('DELETE FROM standard_partners WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 7. STORY
app.get('/api/story', async (req, res) => {
  try {
    const results = await query('SELECT * FROM company_story WHERE id = 1');
    if(results.length > 0) res.json(results[0]);
    else res.json({});
  } catch (e) { res.status(500).send(e); }
});

app.put('/api/story', async (req, res) => {
  try {
    const { foundingYear, intro, mission, vision } = req.body;
    await query(
      'UPDATE company_story SET foundingYear=?, intro=?, mission=?, vision=? WHERE id=1',
      [foundingYear, intro, mission, vision]
    );
    res.json({ success: true });
  } catch (e) { res.status(500).send(e); }
});

// 8. SETTINGS
app.get('/api/settings', async (req, res) => {
  try {
    const results = await query('SELECT * FROM site_settings WHERE id = 1');
    if(results.length > 0) {
        const r = results[0];
        const settings = {
            ...r,
            announcement: {
                active: !!r.announcement_active,
                message: r.announcement_message,
                type: r.announcement_type
            }
        };
        delete settings.announcement_active;
        delete settings.announcement_message;
        delete settings.announcement_type;
        
        res.json(settings);
    } else res.json({});
  } catch (e) { res.status(500).send(e); }
});

app.put('/api/settings', async (req, res) => {
  try {
    const { companyName, logoUrl, phone, email, address, city, linkedinUrl, facebookUrl, announcement } = req.body;
    await query(
      'UPDATE site_settings SET companyName=?, logoUrl=?, phone=?, email=?, address=?, city=?, linkedinUrl=?, facebookUrl=?, announcement_active=?, announcement_message=?, announcement_type=? WHERE id=1',
      [companyName, logoUrl, phone, email, address, city, linkedinUrl, facebookUrl, announcement.active, announcement.message, announcement.type]
    );
    res.json({ success: true });
  } catch (e) { console.error(e); res.status(500).send(e); }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
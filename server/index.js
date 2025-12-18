
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// Sur cPanel, le port est souvent passé via l'environnement, sinon 3001
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'groupenovitec_adminmspuser', 
  password: process.env.DB_PASSWORD || 'vGRi6ioateHKMGQVZTbctL', 
  database: process.env.DB_NAME || 'groupenovitec_mspwebsite',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const db = mysql.createPool(dbConfig);

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Route de santé pour tester la connexion
app.get('/api/health', async (req, res) => {
  try {
    await query('SELECT 1');
    res.json({ status: 'OK', database: 'CONNECTED', env: process.env.NODE_ENV || 'development' });
  } catch (e) {
    res.status(500).json({ status: 'ERROR', error: e.message });
  }
});

// --- EXEMPLE DE ROUTE (Articles) ---
app.get('/api/posts', async (req, res) => {
  try {
    const results = await query('SELECT * FROM posts ORDER BY id DESC');
    res.json(results);
  } catch (e) { res.status(500).send(e); }
});

// Importez ici les autres routes de la version précédente...
// (Settings, Team, Story, Jobs, Partners, Status, Incidents)

app.listen(PORT, () => {
  console.log(`Serveur Novitec actif sur le port ${PORT}`);
});

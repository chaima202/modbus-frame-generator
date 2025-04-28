const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../front')));

// Route par défaut pour afficher le fichier index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front', 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const mysql = require('mysql2');

// Créer la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hamdouleh2025*', // Mets ton vrai mot de passe ici
  database: 'modbus_db'
});

// Vérifier la connexion
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

// Ajouter des routes Express pour insérer et lire dans la base

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Pour recevoir du JSON dans les requêtes POST

// Route pour insérer une trame
app.post('/sauvegarder-trame', (req, res) => {
  const { type, adresse, fonction, donnees, trame_complete } = req.body;
  
  const sql = 'INSERT INTO trames (type, adresse, fonction, donnees, trame_complete) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [type, adresse, fonction, donnees, trame_complete], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l\'insertion');
      return;
    }
    res.send('Trame sauvegardée avec succès');
  });
});

// Route pour récupérer toutes les trames
app.get('/trames', (req, res) => {
  connection.query('SELECT * FROM trames', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des trames');
      return;
    }
    res.json(results);
  });
});

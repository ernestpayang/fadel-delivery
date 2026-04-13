const express = require('express');
const cors = require('cors');
const app = express();

// 1. Définir les origines autorisées
const allowedOrigins = [
  'http://localhost:3001',      // Ton futur Frontend Web (Next.js/React)
  'http://localhost:3000',      // Pour Swagger ou tests locaux
  'http://127.0.0.1:3001'
];

// 2. Configurer les options CORS
const corsOptions = {
  origin: function (origin, callback) {
    // On autorise :
    // - Les origines dans notre liste (allowedOrigins)
    // - Les requêtes sans origine (comme les applications mobiles ou Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Accès refusé par la politique CORS de FaDel'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Utile si tu prévois d'utiliser des cookies plus tard
};

// 3. Appliquer le middleware
app.use(cors(corsOptions));

app.use(express.json());

// Ta route health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Le serveur FaDel fonctionne correctement',
    timestamp: new Date().toISOString()
  });
});

// Route de test pour valider le POST
app.post('/health', (req, res) => {
  console.log("Données reçues du client :", req.body);
  res.status(200).json({
    status: 'POST_SUCCESS',
    receivedData: req.body
  });
});

// Si tu avais déjà ajouté la vérification Prisma, remplace la route ci-dessus par :
/*
app.get('/health', async (req, res) => {
  try {
    // await prisma.$queryRaw`SELECT 1`; // Décommente si prisma est défini
    res.status(200).json({ status: 'UP', database: 'CONNECTED' });
  } catch (e) {
    res.status(500).json({ status: 'DOWN', error: e.message });
  }
});
*/

module.exports = app;
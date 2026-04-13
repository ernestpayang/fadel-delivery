// Test de santé de l'API


const app = require('./app');
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/health', async (req, res) => {
  try {
    // On teste la connexion à PostgreSQL
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'UP',
      database: 'CONNECTED',
      message: 'Le serveur FaDel et la base de données sont opérationnels',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      database: 'ERROR',
      details: error.message, // Ici, l'erreur ne sera plus "prisma is not defined"
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur FaDel démarré sur http://localhost:${PORT}`);
});


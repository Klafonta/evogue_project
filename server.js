const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour parser le JSON
app.use(express.json());

// Importer et utiliser les routes définies dans /src/routes
const apiRoutes = require('./src/routes/api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

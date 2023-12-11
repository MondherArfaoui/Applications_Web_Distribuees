const mongoose = require('mongoose');

// Définition de l'option strictQuery à false pour éviter l'avertissement de dépréciation
mongoose.set('strictQuery', false);

// URL de connexion MongoDB
const url = "mongodb://0.0.0.0:27017/microserviceUser";

// Fonction asynchrone pour la connexion
async function connectDB() {
  try {
    await mongoose.connect(url);
    console.log('Connecté avec succès à MongoDB');
  } catch (err) {
    console.error('Erreur lors de la connexion à MongoDB', err);
  }
}

connectDB();
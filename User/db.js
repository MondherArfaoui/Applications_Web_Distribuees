const mongoose = require('mongoose');

// Définition de l'option strictQuery à false pour éviter l'avertissement de dépréciation
mongoose.set('strictQuery', false);

// URL de connexion MongoDB
const url = "mongodb://0.0.0.0:27017/microserviceUser";

// Connexion à MongoDB
mongoose.connect(url, (err) => {
  if (err) {
    console.log('Erreur lors de la connexion');
  } else {
    console.log('Connecté avec succès');
  }
});
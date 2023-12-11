const express = require('express');
const app = express();
const cors = require('cors');
require("./db");
const dotenv = require('dotenv').config();
const port = 3000;
require("./eureka")

app.use(express.json());
app.use(cors());


const authRouter = require("./routers/authRouter")
app.use("/auth", authRouter)

const medecinRouter = require("./routers/medecinRouter")
app.use("/medecin", medecinRouter)

const patientRouter = require("./routers/patientRouter")
app.use("/patient", patientRouter)


app.get('/getImage/:img', function(req,res){
    res.sendFile(__dirname + '/storage/' + req.params.img)
})
  

// Démarrage du serveur
app.listen(port, function() {
    console.log(`Le serveur est en cours d'exécution, veuillez ouvrir dans votre navigateur à l'adresse http://localhost:${port}`);
});
const mongoose = require("mongoose");
const userModel = require("./userModel");

const medecinSchema = new mongoose.Schema({
    matricule: {
        type: String,

        required: true,
        trim: true,
        unique: true
    },
    specialite: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true});

module.exports = userModel.discriminator("medecins", medecinSchema);
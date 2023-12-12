const mongoose = require("mongoose");
const userModel = require("./userModel");

const patientSchema = new mongoose.Schema({
    dateNaissance: {
        type: String,
        required: true,
        trim: true
    },
    sexe: {
        type: String,
        required: true,
        trim: true
    },
    telephone: {
        type: String,
        required: true,
        trim: true
    },
    numSecuriteSociale: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {timestamps: true});

module.exports = userModel.discriminator("patients", patientSchema);
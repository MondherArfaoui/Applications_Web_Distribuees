const medecinModel = require("../models/medecinModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const Joi = require('joi');

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7653b5629037ad",
      pass: "032935cb7fc7c9"
    }
});

module.exports = {
    create: async (req, res) => {
        try {
            const schemaVal = Joi.object({
                nom: Joi.string().required(),
                prenom: Joi.string().required(),
                image: Joi.string(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
                specialite: Joi.string().required(),
                matricule: Joi.string().required()
            });

            const { error, value } = schemaVal.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            };

            if (req.file) {
                req.body.image = req.file.filename;
            }

            const plainPassword = req.body.password;
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

            const cust = new medecinModel({
                ...req.body, 
                password: hashedPassword,
                codeVerification: crypto.randomBytes(20).toString('hex')
            });

            const savedItem = await cust.save();

            // Envoyer l'e-mail
            await transport.sendMail({
                from: "MED Esprit",
                to: savedItem.email,
                subject: "Inscription",
                text: "Inscrit avec succès",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <b>Inscrit avec succès</b>
                    <a href='http://localhost:3000/auth/verify/${savedItem.codeVerification}'>Cliquez ici pour vérifier votre compte</a>
                </body>
                </html>`
            });

            res.status(201).json({ success: true, message: "success", data: savedItem });
        } catch (error) {
            res.status(400).json({ success: false, message: "error" + error, data: null });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;

            const schemaVal = Joi.object({
                nom: Joi.string().required(),
                prenom: Joi.string().required(),
                image: Joi.string(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
                specialite: Joi.string().required(),
                matricule: Joi.string().required()
            })
            const { error, value } = schemaVal.validate(req.body);
            if(error){
                return res.status(400).json({error:error.details[0].message})
            };

            
            const { password, ...updateData } = req.body;
            
            updateData.image = req.file?.filename

            if (password) {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                updateData.password = hashedPassword;
            }

            const cust = await medecinModel.findByIdAndUpdate(id, updateData, { new: true });

            if (!cust) {
                return res.status(404).json({ success: false, message: "Medecin not found", data: null });
            }

            res.status(200).json({ success: true, message: "Medecin updated successfully", data: cust });
        } catch (error) {
            res.status(400).json({ success: false, message: "Error: " + error, data: null });
        }
    },
    read: async (req, res) => {
        try {
            const prod = await medecinModel.find();
            res.status(200).json({ success: true, message: "Success", data: prod });
        } catch (error) {
            res.status(400).json({ success: false, message: "Error: " + error, data: null });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const cust = await medecinModel.findByIdAndDelete(id);

            if (!cust) {
                return res.status(404).json({ success: false, message: "Medecin not found", data: null });
            }

            res.status(200).json({ success: true, message: "Medecin deleted successfully", data: null });
        } catch (error) {
            res.status(400).json({ success: false, message: "Error: " + error, data: null });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;

            const cust = await medecinModel.findById(id);
            
            if (!cust) {
                return res.status(404).json({ success: false, message: "Medecin not found", data: null });
            }

            res.status(200).json({ success: true, message: "Success", data: cust });
        } catch (error) {
            res.status(400).json({ success: false, message: "Error: " + error, data: null });
        }
    },
    getByMatricule: async (req, res) => {
        try {
            const { matricule } = req.params;

            const cust = await medecinModel.findOne({ matricule: matricule });
            
            if (!cust) {
                return res.status(404).json({ success: false, message: "Medecin not found", data: null });
            }

            res.status(200).json({ success: true, message: "Success", data: cust });
        } catch (error) {
            res.status(400).json({ success: false, message: "Error: " + error, data: null });
        }
    },
    
}
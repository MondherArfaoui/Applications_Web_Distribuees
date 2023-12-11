const userModel = require("../models/userModel");
const { join } = require("path");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

function generateAccessToken(user) {
    return jwt.sign({id:user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
}
let refreshTokens = []
function generateRefreshToken(user) {
    return jwt.sign({id:user.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
}

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7653b5629037ad",
      pass: "032935cb7fc7c9"
    }
});

module.exports = {
    verif : async(req,res) =>{
        try {
            const user = await userModel.findOne ({ codeVerification
                : req.params.codeVerification })
            user.verified = true
            user.codeVerification = undefined
            user.save()
            return res.sendFile(join(__dirname, "../template/success.html"))
        } catch (error) {
            return res.sendFile(join(__dirname, "../template/error.html"))
        }
    },
    login : async(req,res) =>{
        const { email, password} = req.body;
        try {
            const user = await userModel.findOne ({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: "email incorrect", data: null });
            }
            if (!user.verified) {
                return res.status(400).json({ success: false, message: "veuillez vérifier votre compte", data: null });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "mot de passe incorrect", data: null });
            }
            const accessToken = generateAccessToken (user)
            const refreshToken = generateRefreshToken (user)
            refreshTokens.push(refreshToken)
            return res.status(201).json({ success: true, message: "Bienvenu", data: {data: user, Token: accessToken, refreshToken: refreshToken} });
        } catch (error) {
            return res.status(400).json({ success: false, message: "error"+error, data: null });
        }
    },
    logout: async (req, res) => {
        const refreshToken = req.body.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "Refresh token manquant", data: null });
        }
        
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json({ success: false, message: "Refresh token invalide", data: null });
        }
        
        // Supprimer le refresh token de la liste des jetons actifs
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        
        return res.status(200).json({ success: true, message: "Déconnexion réussie", data: null });
    },
    verifyRefreshToken: async (req, res) => {
        const refreshToken = req.body.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "Refresh token manquant", data: null });
        }
        
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json({ success: false, message: "Refresh token invalide", data: null });
        }
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Refresh token invalide", data: null });
            }
            
            const accessToken = generateAccessToken({ id: user.id });
            const refreshToken = generateRefreshToken({ id: user.id });
            
            return res.status(200).json({ success: true, message: "Token actualisé", data: {accessToken: accessToken, refreshToken: refreshToken} });
        });
    },
    userConnect: async (req, res) => {
        try {
            const user = req.user;
            return res.status(200).json({user: user, message: "success"});
        } catch (error) {
            return res.status(403).json({user: null, message:"error"});
        }
    },
    forgotPassword: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: "Aucun utilisateur avec cet email." });
            }

            const resetToken = jwt.sign({id:user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
            user.resetToken = resetToken;
            await user.save();

            transport.sendMail({
                from: "MED Esprit",
                to: user.email,
                subject: "Réinitialisation du mot de passe",
                text: "Réinitialisation du mot de passe",
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Réinitialisation du mot de passe</title>
                </head>
                <body>
                    <b>Réinitialisation du mot de passe</b>
                    <a href='http://localhost:4200/ResetPassword/${resetToken}'>Cliquez ici pour réinitialiser votre mot de passe</a>
                </body>
                </html>`
            }, (err, info) => {
                if (err) {
                    return res.status(400).json({ success: false, message: "Une erreur s'est produite lors de l'envoi de l'email." });
                }
                return res.status(200).json({ success: true, message: "Email envoyé avec succès." });
            });

        } catch (error) {
            return res.status(400).json({ success: false, message: "error"+error });
        }
    },
    resetPassword: async (req, res) => {
        const { newPassword } = req.body;
        const token = req.params.resetToken;
      
        try {
          const user = await userModel.findOne({
            resetToken: token,
          });
      
          if (!user) {
            return res.status(400).json({ success: false, message: "Jeton de réinitialisation invalide ou expiré.", data: null });
          }
      
          user.password = await bcrypt.hash(newPassword, saltRounds);
          user.resetToken = undefined;
          await user.save();
      
          return res.status(201).json({ success: true, message: "Mot de passe réinitialisé avec succès.", data: user });
        } catch (error) {
          return res.status(500).json({ success: false, message: "Erreur lors de la réinitialisation du mot de passe.", data: null });
        }
    },
      
}
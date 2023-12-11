const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');

module.exports = {
    autorisation : async(req,res,next) =>{
        const authHeader = req.headers['authorization']
        if (!authHeader) return res.status(401).json({ success: false, message: "Token manquant", data: null });
        jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, donner) => {
            if (err) return res.status(403).json({ success: false, message: "Token invalide", data: null });
            req.user = donner
            next()
        })
    }
}
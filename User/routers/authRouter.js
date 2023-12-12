const auth = require("../controllers/auth");
const route = require("express").Router();
const authMiddleware=require('../middleware/autorisation')

route.get("/verify/:codeVerification", auth.verif);
route.post("/login", auth.login);
route.post("/logout", auth.logout);
route.post("/verifyRefreshToken", auth.verifyRefreshToken);
route.get("/userConnect", authMiddleware.autorisation, auth.userConnect);
route.post("/forgotPassword", auth.forgotPassword);
route.post("/reset/:resetToken", auth.resetPassword);

module.exports = route;
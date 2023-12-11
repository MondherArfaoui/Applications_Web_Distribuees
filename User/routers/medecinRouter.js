const medecinController = require("../controllers/medecinController");
const route = require("express").Router();
const upload = require("../middleware/upload");

route.post("/add", upload.single("photo"), medecinController.create);
route.put("/update/:id", upload.single("photo"), medecinController.update);
route.get("/", medecinController.read);
route.delete("/delete/:id", medecinController.delete);
route.get("/getById/:id", medecinController.getById);
route.get("/getByMatricule/:matricule", medecinController.getByMatricule);

module.exports = route;
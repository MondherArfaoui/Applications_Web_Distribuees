const patientController = require("../controllers/patientController");
const route = require("express").Router();
const upload = require("../middleware/upload");

route.post("/add", upload.single("photo"), patientController.create);
route.put("/update/:id", upload.single("photo"), patientController.update);
route.get("/", patientController.read);
route.delete("/delete/:id", patientController.delete);
route.get("/getById/:id", patientController.getById);
route.get("/getByNumSecuriteSociale/:numSecuriteSociale", patientController.getByNumSecuriteSociale);

module.exports = route;
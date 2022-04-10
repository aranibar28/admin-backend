/* Ruta: http://localhost:3000/api/hospitals/ */

const { Router } = require("express");
const { check } = require("express-validator");

const { getHospitals, createHospital, updateHospital, deleteHospital } = require("../controllers/hospitals");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-token");

const router = Router();

// CRUD HOSPITALES
router.get("/", getHospitals);
router.post("/", [validateJWT, check("name", "El nombre del hospital es obligatorio.").not().isEmpty(), validateFields], createHospital);
router.put("/:id", [validateJWT, check("name", "El nombre del hospital es obligatorio.").not().isEmpty(), validateFields], updateHospital);
router.delete("/:id", validateJWT, deleteHospital);

module.exports = router;

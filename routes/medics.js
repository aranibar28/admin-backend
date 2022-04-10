/* Ruta: http://localhost:3000/api/medics/ */

const { Router } = require("express");
const { check } = require("express-validator");
const { getMedics, createMedic, updateMedic, deleteMedic } = require("../controllers/medics");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-token");

const router = Router();

router.get("/", getMedics);

router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre del médico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
    validateFields,
  ],
  createMedic
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre del médico es necesario").not().isEmpty(),
    check("hospital", "El hospital id debe ser válido").isMongoId(),
    validateFields,
  ],
  updateMedic
);

router.delete("/:id", deleteMedic);

module.exports = router;

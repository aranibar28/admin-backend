/* Ruta: http://localhost:3000/api/search/:search */
const { Router } = require("express");
const { getTodo, getCollection } = require("../controllers/search");
const { validateJWT } = require("../middlewares/validate-token");

const router = Router();

router.get("/:search", validateJWT, getTodo);
router.get("/collection/:table/:search", validateJWT, getCollection);

module.exports = router;

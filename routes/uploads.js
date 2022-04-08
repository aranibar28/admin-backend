/* Ruta: http://localhost:3000/api/uploads/ */
const { Router } = require("express");
const expressfileUpload = require('express-fileupload');

const { fileUploads, returnImg } = require("../controllers/uploads");
const { validateJWT } = require("../middlewares/validate-token");

const router = Router();
// default options
router.use(expressfileUpload());

router.put("/:type/:id", validateJWT, fileUploads);
router.get("/:type/:img", returnImg);

module.exports = router;

/* Ruta: http://localhost:3000/api/users/ */

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsers, createUsers, updateUser, deleteUser } = require("../controllers/users");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-token");

const router = Router();

router.get("/", validateJWT, getUsers);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validateFields,
  ],
  createUsers
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete("/:id", validateJWT, deleteUser);

module.exports = router;

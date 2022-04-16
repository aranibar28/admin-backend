const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = (req, res, next) => {
  // Leer Token
  const token = req.header("token");

  // Validar que se incluya el Token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No se encontro token",
    });
  }

  try {
    // Comparar Token y hacer match
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid; // Por si necesitas el id, no es obligatorio esta línea.
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

const validateADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Ususario no encontrado",
      });
    }
    if (userDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para realizar esta acción.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

const validateADMIN_ROLE_USER_ROLE = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Ususario no encontrado",
      });
    }
    if (userDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para realizar esta acción.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

module.exports = { validateJWT, validateADMIN_ROLE, validateADMIN_ROLE_USER_ROLE };

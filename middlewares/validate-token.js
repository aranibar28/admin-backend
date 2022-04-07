const jwt = require("jsonwebtoken");

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

module.exports = { validateJWT };

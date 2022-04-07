const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    // Asignar datos necesarios en el payload
    const payload = {
      uid,
    };

    // Codificar el payload, token, experiación y callback por si algo sale mal.
    jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "12h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("No se pudo generar el JWT!");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { generateJWT };

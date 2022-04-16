const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontend } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar Email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    // Verificar Password
    const validPassword = bcryptjs.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Password no válido",
      });
    }

    // Generar Token
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontend(userDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... resvisar logs!",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);
    const userDB = await User.findOne({ email });
    let user;

    // Valida que exista el usuario
    if (!userDB) {
      user = new User({
        name,
        email,
        password: "@@@",
        image: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    // Guardar en base de datos
    await user.save();

    // Generar Token
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontend(user.role),
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: "El token no es correcto",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar Token - JWT
  const token = await generateJWT(uid);

  // Obtener el usuario por UID
  const userDB = await User.findById(uid);

  res.json({
    ok: true,
    token,
    userDB,
    menu: getMenuFrontend(userDB.role),
  });
};

module.exports = { login, googleSignIn, renewToken };

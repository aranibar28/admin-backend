const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  const [users, total] = await Promise.all([
    User.find({}, "name email role google image").skip(from).limit(5),
    User.countDocuments()
  ]);

  res.json({
    ok: true,
    users,
    total,
  });
};

const createUsers = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Validar correo electrónico único
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Este correo ya se encuentra registrado.",
      });
    }

    // Asignar data del Usuario a una constante
    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar Usuario
    await user.save();

    // Generar un Token
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
    console.log(error);
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    // Validar que existe id del Usuario
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con este id",
      });
    }

    // Excluir password, google y email en la actualización
    const { password, google, email, ...campos } = req.body;

    // Validar que email del Usuario sea diferente
    if (userDB.email != email) {
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Este correo ya se encuentra registrado.",
        });
      }
    }

    // Volver a incluir email en la actualización
    campos.email = email;

    // Actualizar Usuario
    const updateUser = await User.findByIdAndUpdate(uid, campos, { new: true });

    res.json({
      ok: true,
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado... revisar logs!" });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    // Validar que existe id del Usuario
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(400).json({
        ok: false,
        msg: "No existe un usuario con este id",
      });
    }

    // Eliminar Usuario
    await User.findByIdAndDelete(uid);
    res.json({
      ok: true,
      msg: "El usuario fue eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error inesperado... revisar logs!" });
  }
};

module.exports = { getUsers, createUsers, updateUser, deleteUser };

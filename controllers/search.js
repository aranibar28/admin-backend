const { response } = require("express");
const User = require("../models/user");
const Hospital = require("../models/hospital");
const Medic = require("../models/medic");

const getTodo = async (req, res = response) => {
  // Obtenemos la palabra del parámetro
  const word = req.params.search;

  // Expresión Regular para búsquedas insensibles
  const regex = new RegExp(word, "i");

  // Ejectutar las 3 promesas de manera simultánea
  const [user, hospital, medic] = await Promise.all([
    User.find({ name: regex }), 
    Hospital.find({ name: regex }), 
    Medic.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    user,
    hospital,
    medic,
  });
};

const getCollection = async (req, res = response) => {
  // Obtenemos la palabra del parámetro
  const table = req.params.table;
  const word = req.params.search;
  // Expresión Regular para búsquedas insensibles
  const regex = new RegExp(word, "i");
  let data = [];
  switch (table) {
    case "users":
      data = await User.find({ hospital: regex });
      break;
    case "hospitals":
      data = await Hospital.find({ medic: regex }).populate("user", "name img");
      break;
    case "medics":
      data = await Medic.find({ name: regex }).populate("user", "name img").populate("hospital", "name img");
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "Hubo un error",
      });
  }
  res.json({
    ok: true,
    result: data,
  });
};

module.exports = { getTodo, getCollection };

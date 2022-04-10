const { response } = require("express");
const Medic = require("../models/medic");

const getMedics = async (req, res = response) => {
  const medics = await Medic.find().populate("user", "name image").populate("hospital", "name image");

  res.json({
    ok: true,
    medics,
  });
};

const createMedic = async (req, res = response) => {
  const uid = req.uid;

  const medic = new Medic({
    user: uid,
    ...req.body,
  });

  try {
    // Guardar Médico
    const medicDB = await medic.save();

    res.json({
      ok: true,
      medic: medicDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

const updateMedic = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    // Validar que exista id del Médico
    const medicDB = await Medic.findById(id);
    if (!medicDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un médico con este id",
      });
    }

    // Datos
    const data = {
      ...req.body,
      user: uid,
    };

    // Actualizar Hospital
    const updateMedic = await Medic.findByIdAndUpdate(id, data, { new: true });

    res.json({
      ok: true,
      medic: updateMedic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

const deleteMedic = async (req, res = response) => {
  const id = req.params.id;

  try {
    const medicDB = await Medic.findById(id);

    // Validar que exista id del Hospital
    if (!medicDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un médico con este id",
      });
    }

    // Eliminar Hospital
    await Medic.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Médico Eliminado!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

module.exports = { getMedics, createMedic, updateMedic, deleteMedic };

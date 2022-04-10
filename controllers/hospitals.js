const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name image");

  res.json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;

  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    // Guardar Hospital
    const hospitalDB = await hospital.save();
    
    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

const updateHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    // Validar que exista id del Hospital
    const hospitalDB = await Hospital.findById(id);
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un hospital con este id",
      });
    }

    // Datos
    const data = {
      ...req.body,
      user: uid,
    };

    // Actualizar Hospital
    const updateHospital = await Hospital.findByIdAndUpdate(id, data, { new: true });

    res.json({
      ok: true,
      hospital: updateHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospitalDB = await Hospital.findById(id);

    // Validar que exista id del Hospital
    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un hospital con este id",
      });
    }

    // Eliminar Hospital
    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital Eliminado!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

module.exports = { getHospitals, createHospital, updateHospital, deleteHospital };

const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUploads = (req, res = response) => {
  // Obtener el tipo y el id de los parámetros
  const type = req.params.type;
  const id = req.params.id;

  const typeValidates = ["hospitals", "medics", "users"];

  // Validar que sea un tipo válido
  if (!typeValidates.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un tipo válido",
    });
  }

  // Validar que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun arhchivo.",
    });
  }

  // Procesar la imagen
  const file = req.files.image;
  const nameCut = file.name.split(".");
  const extensionFile = nameCut[nameCut.length - 1];

  // Validar extensión
  const extensionValidates = ["png", "jpg", "jpeg", "gif"];
  if (!extensionValidates.includes(extensionFile)) {
    return res.status(400).json({
      ok: false,
      msg: "No extensión permitido.",
    });
  }

  // Generar el nombre del archivo
  const nameFile = `${uuidv4()}.${extensionFile}`;

  // Path para guardar la imagen del archivo
  const path = `./uploads/${type}/${nameFile}`;

  // Mover la imagen
  file.mv(path, (err) => {
    if (err)
      return res.status(500).json({
        ok: false,
        msg: "Hubo un error",
      });

    // Actualizar base de datos
    updateImage(type, id, nameFile);

    res.json({
      ok: true,
      msg: "Archivo subido",
      nameFile,
    });
  });
};

const returnImg = (req, res = response) => {
  // Obtener el tipo y la foto de los parámetros
  const type = req.params.type;
  const photo = req.params.img;

  const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);

  // Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.png`);
    res.sendFile(pathImg);
  }
};

module.exports = { fileUploads, returnImg };

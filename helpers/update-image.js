const fs = require("fs");
const User = require("../models/user");
const Medic = require("../models/medic");
const Hospital = require("../models/hospital");

// Eliminar imagen anterior
const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, nameFile) => {
  let pathOld = "";
  switch (type) {
    case "medics":
      const medic = await Medic.findById(id);
      // Validar que exista el tipo
      if (!medic) {
        console.log("No es un médico por id");
        return false;
      }

      pathOld = `./uploads/medics/${medic.image}`;
      deleteImage(pathOld);

      medic.image = nameFile;
      await medic.save();
      return true;

    case "hospitals":
      const hospital = await Hospital.findById(id);
      // Validar que exista el tipo
      if (!hospital) {
        console.log("No es un hospital por id");
        return false;
      }

      pathOld = `./uploads/hospitals/${hospital.image}`;
      deleteImage(pathOld);

      hospital.image = nameFile;
      await hospital.save();
      return true;

    case "users":
      // Validar que exista el tipo
      const user = await User.findById(id);
      if (!user) {
        console.log("No es un user por id");
        return false;
      }

      pathOld = `./uploads/users/${user.image}`;
      deleteImage(pathOld);

      user.image = nameFile;
      await user.save();
      return true;
  }
};

module.exports = { updateImage };

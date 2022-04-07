# AdminPRO Backend

## Instalación y Ejecución

     npm install
     npm run server o nodemon index.js

### Instalar paquetes iniciales

     npm init -y
     npm i express --save
     npm i express-validator
     npm i bcryptjs
     npm i cors
     npm i jsonwebtoken

### Creación de variables de Entorno

     npm i dontenv

Crear un archivo `.env` y especificar las siguientes variables:

- PORT=3000
- DB_CNN=mongodb+srv://`<username>`:`<password>`@cluster0.o7ft6.mongodb.net/`<testbd>`

-----------------------------------------------------------

## Creación de Modelo 

Ejemplo: `models/users.js`

     const { Schema, model } = require("mongoose");

     const userSchema = new Schema({
          name:{ type: String, require: true },
     })

     module.exports = model("Users", userSchema);

## Creación de Controlador 

Ejemplo: `controllers/user.js`

     const getUsers = (req, res) => {
     res.json({
          ok: true,
          users: [],
          });
     };

     module.exports = { getUsers };

## Creación de Ruta 

Ejemplo: `routes/users.js`

     const { Router } = require("express");
     const { getUsers } = require("../controllers/users");
     const router = Router();

     router.get("/", getUsers);
     module.exports = router;

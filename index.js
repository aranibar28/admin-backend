require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// Crear servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de Datos
dbConnection();

// Rutas
app.use("/api/login", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/medics", require("./routes/medics"));
app.use("/api/search", require("./routes/search"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo Puerto: " + 3000);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import routes from "./src/routes.js";

const app = express();
app.use(express.json());

// Opciones de configuración para CORS
const corsOptions = {
  origin: "*", // Permite solicitudes desde cualquier origen, puedes ajustarlo según tus necesidades
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos HTTP permitidos
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

dotenv.config();
const port = process.env.PORT || 5000;
app.setMaxListeners(0);

// Obtener Rutas
app.use("/", routes);

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});

app.post("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});

app.put("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});

app.delete("/", (req, res) => {
  res.send("¡Bienvenido, PGA!");
});
// Iniciar el servidor y hacer que escuche en el puerto definido
app.listen(port, () => {
  console.log(`Servidor iniciado exitosamente`);
});

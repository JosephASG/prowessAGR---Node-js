// Importa los módulos necesarios
const dotenv = require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const sendEmail = require('./utils/sendEmail');

// Crea una instancia de Express
const app = express();

app.use(express.json());
// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());
app.use(cors());

//route
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor en operación (Puerto ${port}).`);
});


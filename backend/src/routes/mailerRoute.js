import { sendEmail } from "../helpers/mailer.js";
import express from "express";

const mailRoute = express.Router();

mailRoute.post("/send-email", (req, res) => {
  const { email, subject, htmlContent } = req.body;
  sendEmail(email, subject, htmlContent, (error, info) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error al enviar el correo", error });
    }
    res
      .status(200)
      .json({ success: true, message: "Correo enviado exitosamente", info });
  });
});

export default mailRoute;

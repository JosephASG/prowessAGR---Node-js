// resetRoute.js
import express from 'express';
import { forgotPassword, resetPassword } from '../controller/resetController.js';

const resetRoute = express.Router();

// Ruta para solicitar el restablecimiento de la contraseña
resetRoute.post('/forgotpassword', forgotPassword);

// Ruta para restablecer la contraseña
resetRoute.put('/resetpassword/:resetToken', resetPassword);

export default resetRoute;
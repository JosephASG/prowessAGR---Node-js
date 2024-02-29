import * as motorizado from '../controller/motorizadoController.js';
import express from 'express';

const motorizadoRoute = express.Router();

// Crear un nuevo motorizado
motorizadoRoute.post('/createmotorizado', motorizado.createMotorizado);

// Obtener todos los motorizados
motorizadoRoute.get('/getmotorizado', motorizado.getMotorizado);

// Obtener un motorizado específico
motorizadoRoute.get('/getmotorizado/:id', motorizado.getMotorizadoByID);

// Actualizar un motorizado
motorizadoRoute.put('/updatemotorizado/:id', motorizado.updateMotorizado);

// Eliminar un motorizado
motorizadoRoute.delete('/deletemotorizado/:id', motorizado.deleteMotorizado);

export default motorizadoRoute;
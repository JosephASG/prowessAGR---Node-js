import * as motorizadoController from '../controller/motorizadoController.js';
import express from 'express';

const motorizadoRoute = express.Router();

// Create a new motorized controller
motorizadoRoute.post('/createmotorizadodController', motorizadoController.createmotorizadoController);

// Get all motorized controllers
motorizadoRoute.get('/getmotorizadoControllers', motorizadoController.getmotorizadoControllers);

// Get a specific motorized controller by ID
motorizadoRoute.get('/getmotorizadoController/:id', motorizadoController.getmotorizadoControllerByID);

// Update a motorized controller
motorizadoRoute.put('/updatemotorizadoController/:id', motorizadoController.updatemotorizadoController);

// Delete a motorized controller
motorizadoRoute.delete('/deletemotorizadoController/:id', motorizadoController.deletemotorizadoController);

export default motorizadoRoute;

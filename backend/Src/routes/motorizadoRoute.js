import * as motorizedController from '../controller/motorizedController.js';
import express from 'express';

const motorizedRoute = express.Router();

// Create a new motorized controller
motorizedRoute.post('/createMotorizedController', motorizedController.createMotorizedController);

// Get all motorized controllers
motorizedRoute.get('/getMotorizedControllers', motorizedController.getMotorizedControllers);

// Get a specific motorized controller by ID
motorizedRoute.get('/getMotorizedController/:id', motorizedController.getMotorizedControllerByID);

// Update a motorized controller
motorizedRoute.put('/updateMotorizedController/:id', motorizedController.updateMotorizedController);

// Delete a motorized controller
motorizedRoute.delete('/deleteMotorizedController/:id', motorizedController.deleteMotorizedController);

export default motorizedRoute;

import * as ubicacion from '../controller/locationController.js';
import express from 'express';
import multer from 'multer';



const locationRoute = express.Router();

locationRoute.get('/:province',ubicacion.exportProvinces);
locationRoute.get('/', ubicacion.getAll);
export default locationRoute;
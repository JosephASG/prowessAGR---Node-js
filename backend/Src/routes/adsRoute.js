import express from 'express';
import multer from 'multer';
import * as adsController from '../controller/adsController.js';
import * as tokenController from '../middleware/verifyToken.js';

const adsRouter = express.Router();

// Crear un anuncio
adsRouter.post('/create', tokenController.verifyTokenAdmin, adsController.createAd);

// Obtener todos los anuncios
adsRouter.get('/getAll', tokenController.verifyTokenAdmin, adsController.getAllAds);

// Obtener un anuncio específico por ID
adsRouter.get('/get/:id', adsController.getAdByID);

// Actualizar un anuncio
adsRouter.put('/update/:id', adsController.updateAd);

// Eliminar un anuncio
adsRouter.delete('/delete/:id', adsController.deleteAd);

export default adsRouter;

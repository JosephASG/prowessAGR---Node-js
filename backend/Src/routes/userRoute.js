// Importar las funciones relacionadas con los usuarios desde './userController'
import * as usuario from '../controller/userController.js';
import * as tokencontroller from '../middleware/verifyToken.js';
import express from 'express';
import multer from 'multer';

const userRoute = express.Router();
const almacenamiento = multer.memoryStorage();
const upload = multer({ storage: almacenamiento });

// Crear un nuevo usuario
userRoute.post('/login',upload.none(),usuario.loginUser);
userRoute.get('/',tokencontroller.verifyToken,usuario.getUserById);
userRoute.post('/register', upload.single("imagenUsuario"), usuario.registerUser);
userRoute.post('/password',tokencontroller.verifyToken,usuario.requestPasswordReset);
userRoute.get('/getAll',usuario.getUsers);
userRoute.put('/update',usuario.updateUser);

export default userRoute;
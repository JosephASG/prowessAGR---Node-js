import firebase from 'firebase/app';
import 'firebase/database';
import moment from 'moment-timezone';
import HTTP_STATUS from 'http-status-codes';

// Reemplaza la siguiente configuración con la de tu proyecto Firebase
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  databaseURL: 'TU_DATABASE_URL',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID',
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Crear un nuevo motorizado en Firebase Realtime Database
export const createMotorizado = async (req, res) => {
  try {
    const newMotorizadoRef = database.ref('motorizados').push();
    const newMotorizado = {
      id: newMotorizadoRef.key,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      vehicleType: req.body.vehicleType,
      licensePlate: req.body.licensePlate,
    };
    await newMotorizadoRef.set(newMotorizado);
    return res.status(HTTP_STATUS.OK).send({ message: 'Nuevo Motorizado Creado', motorizado: newMotorizado });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error al crear el motorizado' });
  }
};

// Obtener todos los motorizados de Firebase Realtime Database
export const getAllMotorizados = async (req, res) => {
  try {
    const snapshot = await database.ref('motorizados').once('value');
    const motorizados = snapshot.val();
    return res.status(HTTP_STATUS.OK).send(motorizados);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener los motorizados' });
  }
};

// Obtener un motorizado específico por ID de Firebase Realtime Database
export const getMotorizado = async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await database.ref('motorizados').child(id).once('value');
    const motorizado = snapshot.val();
    return res.status(HTTP_STATUS.OK).send(motorizado);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener el motorizado' });
  }
};

// Actualizar un motorizado en Firebase Realtime Database
export const updateMotorizado = async (req, res) => {
  try {
    const { id } = req.params;
    const motorizadoRef = database.ref('motorizados').child(id);
    const snapshot = await motorizadoRef.once('value');
    const motorizado = snapshot.val();
    if (!motorizado) {
      return res.status(404).json({ message: 'Motorizado no encontrado' });
    }
    const updatedMotorizado = {
      id: motorizado.id,
      name: req.body.name || motorizado.name,
      email: req.body.email || motorizado.email,
      phone: req.body.phone || motorizado.phone,
      vehicleType: req.body.vehicleType || motorizado.vehicleType,
      licensePlate: req.body.licensePlate || motorizado.licensePlate,
    };
    await motorizadoRef.set(updatedMotorizado);
    res.json(updatedMotorizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Eliminar un motorizado de Firebase Realtime Database
export const deleteMotorizado = async (req, res) => {
  try {
    const { id } = req.params;
    await database.ref('motorizados').child(id).remove();
    res.json({ message: 'Motorizado eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

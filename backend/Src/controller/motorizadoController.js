import * as firestore from 'firebase/firestore';
import { fs } from '../database/firebase.js';

// Create a new motorized controller
const createMotorizadoController = async (req, res) => {
  try {
    const newControllerData = req.body;
    const docRef = await firestore.addDoc(firestore.collection(fs, 'motorizadoController'), newControllerData);
    res.json({ id: docRef.id, ...newControllerData });
  } catch (error) {
    console.error('Error creating motorizado controller:', error);
    res.status(500).json({ error: 'Error creating motorizado controller.' });
  }
};

// Get all motorized controllers
const getMotorizadoControllers = async (req, res) => {
  try {
    const querySnapshot = await firestore.getDocs(firestore.collection(fs, 'motorizadoController'));
    const controllers = [];
    querySnapshot.forEach((doc) => {
      controllers.push({ id: doc.id, ...doc.data() });
    });

    res.json(controllers);
  } catch (error) {
    console.error('Error getting motorizado controllers:', error);
    res.status(500).json({ error: 'Error getting motorizado controllers.' });
  }
};

// Get a specific motorized controller by ID
const getMotorizadoControllerByID = async (req, res) => {
  try {
    const controllerId = req.params.id;
    const controllerDoc = await firestore.getDoc(firestore.doc(fs, 'motorizadoController', controllerId));

    if (controllerDoc.exists()) {
      res.json({ id: controllerDoc.id, ...controllerDoc.data() });
    } else {
      res.status(404).json({ error: 'motorizado controller not found.' });
    }
  } catch (error) {
    console.error('Error getting motorizado controller:', error);
    res.status(500).json({ error: 'Error getting motorizado controller.' });
  }
};

// Update a motorized controller
const updateMotorizadoController = async (req, res) => {
  try {
    const controllerId = req.params.id;
    const updatedControllerData = req.body;
    await firestore.updateDoc(firestore.doc(fs, 'motorizadoController', controllerId), updatedControllerData);
    res.json({ id: controllerId, ...updatedControllerData });
  } catch (error) {
    console.error('Error updating motorizado controller:', error);
    res.status(500).json({ error: 'Error updating motorizado controller.' });
  }
};

// Delete motorized controller
const deleteMotorizadoController = async (req, res) => {
  try {
    const controllerId = req.params.id;
    await firestore.deleteDoc(firestore.doc(fs, 'motorizadoController', controllerId));
    res.json({ id: controllerId, message: 'motorizado controller deleted successfully.' });
  } catch (error) {
    console.error('Error deleting motorizado controller:', error);
    res.status(500).json({ error: 'Error deleting motorizado controller.' });
  }
};

export {
  createMotorizadoController,
  getMotorizadoControllers,
  getMotorizadoControllerByID,
  updateMotorizadoController,
  deleteMotorizadoController,
};

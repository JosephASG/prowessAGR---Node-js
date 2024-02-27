// import * as firestore from 'firebase/firestore';
// import { fs } from '../database/firebase.js';

// // Create a new motorized controller
// const createMotorizedController = async (req, res) => {
//   try {
//     const newControllerData = req.body;
//     const docRef = await firestore.addDoc(firestore.collection(fs, 'motorizedController'), newControllerData);
//     res.json({ id: docRef.id, ...newControllerData });
//   } catch (error) {
//     console.error('Error creating motorized controller:', error);
//     res.status(500).json({ error: 'Error creating motorized controller.' });
//   }
// };

// // Get all motorized controllers
// const getMotorizedControllers = async (req, res) => {
//   try {
//     const querySnapshot = await firestore.getDocs(firestore.collection(fs, 'motorizedController'));
//     const controllers = [];
//     querySnapshot.forEach((doc) => {
//       controllers.push({ id: doc.id, ...doc.data() });
//     });

//     res.json(controllers);
//   } catch (error) {
//     console.error('Error getting motorized controllers:', error);
//     res.status(500).json({ error: 'Error getting motorized controllers.' });
//   }
// };

// // Get a specific motorized controller by ID
// const getMotorizedControllerByID = async (req, res) => {
//   try {
//     const controllerId = req.params.id;
//     const controllerDoc = await firestore.getDoc(firestore.doc(fs, 'motorizedController', controllerId));

//     if (controllerDoc.exists()) {
//       res.json({ id: controllerDoc.id, ...controllerDoc.data() });
//     } else {
//       res.status(404).json({ error: 'Motorized controller not found.' });
//     }
//   } catch (error) {
//     console.error('Error getting motorized controller:', error);
//     res.status(500).json({ error: 'Error getting motorized controller.' });
//   }
// };

// // Update a motorized controller
// const updateMotorizedController = async (req, res) => {
//   try {
//     const controllerId = req.params.id;
//     const updatedControllerData = req.body;
//     await firestore.updateDoc(firestore.doc(fs, 'motorizedController', controllerId), updatedControllerData);
//     res.json({ id: controllerId, ...updatedControllerData });
//   } catch (error) {
//     console.error('Error updating motorized controller:', error);
//     res.status(500).json({ error: 'Error updating motorized controller.' });
//   }
// };

// // Delete motorized controller
// const deleteMotorizedController = async (req, res) => {
//   try {
//     const controllerId = req.params.id;
//     await firestore.deleteDoc(firestore.doc(fs, 'motorizedController', controllerId));
//     res.json({ id: controllerId, message: 'Motorized controller deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting motorized controller:', error);
//     res.status(500).json({ error: 'Error deleting motorized controller.' });
//   }
// };

// export {
//   createMotorizedController,
//   getMotorizedControllers,
//   getMotorizedControllerByID,
//   updateMotorizedController,
//   deleteMotorizedController,
// };

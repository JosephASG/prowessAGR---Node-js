import * as firebase from 'firebase/app';
import 'firebase/database';
import * as firestore from 'firebase/firestore';
import { fs, storage } from '../database/firebase.js';

// Crear un nuevo anuncio
const createAd = async (req, res) => {
  try {
    const newAdData = req.body;
    const docRef = await firestore.addDoc(firestore.collection(fs, 'anuncio'), newAdData);
    res.status(200).json({ id: docRef.id, ...newAdData });
  } catch (error) {
    console.error('Error al crear el anuncio:', error);
    res.status(500).json({ error: 'Error al crear el anuncio.' });
  }
};

// Obtener todos los anuncios
const getAllAds = async (req, res) => {
  try {
    const querySnapshot = await firestore.getDocs(firestore.collection(fs, 'anuncio'));
    const anuncios = [];
    querySnapshot.forEach((doc) => {
      anuncios.push({ id: doc.id, ...doc.data() });
    });

    res.json(anuncios);
  } catch (error) {
    console.error('Error al obtener los anuncios:', error);
    res.status(500).json({ error: 'Error al obtener los anuncios.' });
  }
};

// Obtener un anuncio específico por ID
const getAdByID = async (req, res) => {
  try {
    const anuncioId = req.params.id;
    const anuncioDoc = await firestore.getDoc(firestore.doc(fs, 'anuncio', anuncioId));
    if (anuncioDoc.exists()) {
      res.json({ id: anuncioDoc.id, ...anuncioDoc.data() });
    } else {
      res.status(404).json({ error: 'Anuncio no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener el anuncio:', error);
    res.status(500).json({ error: 'Error al obtener el anuncio.' });
  }
};

// Actualizar un anuncio
const updateAd = async (req, res) => {
  try {
    const anuncioId = req.params.id;
    const updatedAdData = req.body; // Los datos actualizados deben estar en el cuerpo de la solicitud (request body)
    await firestore.updateDoc(firestore.doc(fs, 'anuncio', anuncioId), updatedAdData);
    res.json({ id: anuncioId, ...updatedAdData });
  } catch (error) {
    console.error('Error al actualizar el anuncio:', error);
    res.status(500).json({ error: 'Error al actualizar el anuncio.' });
  }
};

// Eliminar un anuncio
const deleteAd = async (req, res) => {
  try {
    const anuncioId = req.params.id;
    await firestore.deleteDoc(firestore.doc(fs, 'anuncio', anuncioId));
    res.json({ id: anuncioId, message: 'Anuncio eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el anuncio:', error);
    res.status(500).json({ error: 'Error al eliminar el anuncio.' });
  }
};

export { createAd, getAllAds, getAdByID, updateAd, deleteAd };

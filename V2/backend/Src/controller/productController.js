import * as firebase from 'firebase/app';
import 'firebase/storage';
import * as firestore from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Configuración de Firebase (reemplaza con la configuración real de tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyAqnpF_ppBXsSawkDiVzYzm2oAV1zLvGWQ",
  authDomain: "prowess-web-database.firebaseapp.com",
  projectId: "prowess-web-database",
  storageBucket: "prowess-web-database.appspot.com",
  messagingSenderId: "519296320778",
  appId: "1:519296320778:web:739cc55990bd1a6e4866f3"
};

// Inicializar Firebase y Firestore
const fiapp = firebase.initializeApp(firebaseConfig);
const fs = firestore.getFirestore(fiapp);
const storage = getStorage(); // Obtén una referencia al servicio de almacenamiento

//import {fs} from "../../firebase.js";

// Agregar un nuevo producto
const createProduct = async (req, res) => {
  try {
    const newProductData = req.body; // Los datos del nuevo producto deben estar en el cuerpo de la solicitud (request body)
    const imageFile = req.file; // Aquí asumimos que el archivo de imagen se encuentra en req.file

    if (imageFile) {
      const storageRef = firebase.storage().ref(`agricola${imageFile.originalname}`);
      try {
        await uploadBytes(storageRef, imageFile.buffer);
        const snapshot = await storageRef.put(imageFile.buffer);
        console.log('Imagen cargada con éxito');


        newProductData.pro_imagen = await snapshot.ref.getDownloadURL();
        console.log('URL de imagen obtenida con éxito');
      } catch (error) {
        console.error('Error al cargar la imagen o obtener la URL de la imagen:', error);
      }
    }

    // Agrega los datos del producto a Firestore
    const docRef = await firestore.addDoc(firestore.collection(fs, 'producto'), newProductData);

    res.json({ id: docRef.id, ...newProductData }); 
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
};


//Obtener todos los productos.
const getProducts =  async (req, res) => {
  try {
    const querySnapshot = await firestore.getDocs(firestore.collection(fs, 'producto'));
    const productos = [];
    querySnapshot.forEach((doc) => {
      productos.push({ id: doc.id, ...doc.data() });
    });

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
};


// Obtener un producto específico
const getProductByID = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId)
    const productDoc = await firestore.getDoc(firestore.doc(fs, 'producto', productId));
    if (productDoc.exists()) {
      res.json({ id: productDoc.id, ...productDoc.data() });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
      // Consulta productos de una categoría específica
      const snapshot = await db.collection('products').where('category', '==', category).get();
      
      const products = [];
      snapshot.forEach(doc => {
          products.push({ id: doc.id, ...doc.data() });
      });

      // Verifica si hay productos para la categoría solicitada
      if (products.length === 0) {
          return res.status(404).json({ message: `No products found for category: ${category}` });
      }

      return res.status(200).json(products);
  } catch (error) {
      return res.status(500).json({ message: "Error fetching products by category.", error: error.message });
  }
};



// Actualizar el producto
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body; // Los datos actualizados deben estar en el cuerpo de la solicitud (request body)
    await firestore.updateDoc(firestore.doc(fs, 'producto', productId), updatedProductData);
    res.json({ id: productId, ...updatedProductData });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
};

// Eliminar
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await firestore.deleteDoc(firestore.doc(fs, 'producto', productId));
    res.json({ id: productId, message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
};

export {getProducts,getProductByID,createProduct,updateProduct,deleteProduct};
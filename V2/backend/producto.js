import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
const fiapp = initializeApp(firebaseConfig);
const firestore = getFirestore(fiapp);

//Obtener todos los productos.
const getProducts =  async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'producto'));
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
    const productDoc = await getDoc(doc(firestore, 'producto', productId));
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

// Agregar un nuevo producto

const createProduct =  async (req, res) => {
  try {
    const newProductData = req.body; // Los datos del nuevo producto deben estar en el cuerpo de la solicitud (request body)
    const docRef = await addDoc(collection(firestore, 'producto'), newProductData);
    res.json({ id: docRef.id, ...newProductData });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
};

// Actualizar el producto
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body; // Los datos actualizados deben estar en el cuerpo de la solicitud (request body)
    await updateDoc(doc(firestore, 'producto', productId), updatedProductData);
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
    await deleteDoc(doc(firestore, 'producto', productId));
    res.json({ id: productId, message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
};

export {getProducts,getProductByID,createProduct,updateProduct,deleteProduct};
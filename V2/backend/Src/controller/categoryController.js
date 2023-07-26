import HTTP_STATUS from "http-status-codes";
import admin from "firebase-admin";

// Configurar Firebase Admin SDK con tus credenciales
const serviceAccount = require('./ruta/de/tu/credencial.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tu-proyecto.firebaseio.com'
});

// Referencia a la base de datos de Firebase
const db = admin.firestore();

// Obtener categoria por el Id
export const getCategoryById = async (req, res) => {
  // Obtener el id de la solicitud
  const id = req.params.id;
  try {
    // Buscar la categoria por el Id en la base de datos
    const docRef = db.collection('categories').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `No category found by id ${id}` });
    }
    // Si se encuentra la categoría, devuelve un estado 200
    return res.status(HTTP_STATUS.OK).json(doc.data());
  } catch (error) {
    // Si hay un error, devuelve un estado 500
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// OBTENER TODAS LAS CATEGORÍAS
export const getCategories = async (req, res) => {
  try {
    // Obtener todas las categorías de la base de datos
    const snapshot = await db.collection('categories').get();
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });

    // Si no se encuentra ninguna categoría, envía una respuesta 404
    if (categories.length === 0) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "No categories found" });
    }

    // Enviar las categorías encontradas en una respuesta JSON
    return res.status(HTTP_STATUS.OK).json(categories);
  } catch (error) {
    // Si se produce un error, envíe el mensaje de error en formato JSON
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

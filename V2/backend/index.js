// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";*/

import express from "express";
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cors());
const port = 5000;
/*
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqnpF_ppBXsSawkDiVzYzm2oAV1zLvGWQ",
  authDomain: "prowess-web-database.firebaseapp.com",
  projectId: "prowess-web-database",
  storageBucket: "prowess-web-database.appspot.com",
  messagingSenderId: "519296320778",
  appId: "1:519296320778:web:739cc55990bd1a6e4866f3"
};

// Initialize Firebase
const fiapp = initializeApp(firebaseConfig);

const db = getFirestore(fiapp);
const storage = getStorage(fiapp);


app.post('/fb/producto/post',(req,res) =>{
  const novProduct = req.body.novProduct;
  try{
    const productRef = db.collection('producto').add(novProduct)
    console.log(productRef)
    return productRef;
  }catch(err){
    console.log("ERROR. INSERCIÓN FALLIDA",err)
  }


})

app.get('/fb/producto/get',(req,res) =>{
  try{
    const productRef = db.collection('producto').get()
    const productos = []
    productRef.forEach((productDoc)=>{
      productos.push({id: productDoc.id,...productDoc.data()});
    })
    console.log(productos)
    return productos;
  }catch(err){
    console.log("ERROR. RECUPERACIÓN DE DATOS FALLIDA.",err)
  }
})*/
// Import Firebase and Firestore
import * as producto from './Src/controller/productController.js';


// Configuración de Firebase (reemplaza con la configuración real de tu proyecto)
//Obtener todos los productos.
app.get('/fb/producto/get', producto.getProducts);


// Obtener un producto específico
app.get('/fb/producto/get/:id', producto.getProductByID);

// Agregar un nuevo producto

app.post('/fb/producto/post', producto.createProduct);

// Actualizar el producto
app.put('/fb/producto/update/:id', producto.updateProduct);
// Eliminar
app.delete('/fb/producto/delete/:id', producto.deleteProduct);

app.listen(port,() =>{
    console.log("Servidor en operación (Puerto 5000).")
})


// Importar el módulo express
import express from 'express';

// Importar las funciones relacionadas con los pedidos desde './orders'
import { crearPedido, obtenerMisPedidos, eliminarPedido, obtenerPedido, marcarPagado, marcarEntregado, obtenerPedidos } from './orders';


// Definir el número de puerto en el que el servidor escuchará
const PUERTO = 3000;

// Rutas para las funciones relacionadas con los pedidos

// Ruta para manejar la creación de un pedido usando el método HTTP POST
app.post('/crearPedido', crearPedido);

// Ruta para manejar la obtención de los pedidos relacionados con un usuario específico usando el método HTTP GET
app.get('/obtenerMisPedidos/:id', obtenerMisPedidos);

// Ruta para manejar la eliminación de un pedido usando el método HTTP DELETE
app.delete('/eliminarPedido/:id', eliminarPedido);

// Ruta para manejar la obtención de un pedido específico por su ID usando el método HTTP GET
app.get('/obtenerPedido/:id', obtenerPedido);

// Ruta para manejar la marca de un pedido como pagado usando el método HTTP PUT
app.put('/marcarPagado/:id', marcarPagado);

// Ruta para manejar la marca de un pedido como entregado usando el método HTTP PUT
app.put('/marcarEntregado/:id', marcarEntregado);

// Ruta para manejar la obtención de todos los pedidos relacionados con un usuario específico usando el método HTTP GET
app.get('/obtenerPedidos/:id', obtenerPedidos);

// Iniciar el servidor y hacer que escuche en el puerto definido
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
// Rutas para las funciones relacionadas con los pedidos

// Ruta para manejar la creación de un pedido usando el método HTTP POST
export const crearPedido = (req, res) => {
  // Implementar lógica para crear un pedido aquí
};

// Ruta para manejar la obtención de los pedidos relacionados con un usuario específico usando el método HTTP GET
export const obtenerMisPedidos = (req, res) => {
  // Implementar lógica para obtener los pedidos de un usuario específico aquí
};

// Ruta para manejar la eliminación de un pedido usando el método HTTP DELETE
export const eliminarPedido = (req, res) => {
  // Implementar lógica para eliminar un pedido aquí
};

// Ruta para manejar la obtención de un pedido específico por su ID usando el método HTTP GET
export const obtenerPedido = (req, res) => {
  // Implementar lógica para obtener un pedido específico por su ID aquí
};

// Ruta para manejar la marca de un pedido como pagado usando el método HTTP PUT
export const marcarPagado = (req, res) => {
  // Implementar lógica para marcar un pedido como pagado aquí
};

// Ruta para manejar la marca de un pedido como entregado usando el método HTTP PUT
export const marcarEntregado = (req, res) => {
  // Implementar lógica para marcar un pedido como entregado aquí
};

// Ruta para manejar la obtención de todos los pedidos relacionados con un usuario específico usando el método HTTP GET
export const obtenerPedidos = (req, res) => {
  // Implementar lógica para obtener todos los pedidos de un usuario específico aquí
};


// index.js

// Importar el módulo express
import express from 'express';

// Importar las funciones relacionadas con los pedidos desde './orders'
import { createOrder, getMyOrders, deleteOrder, getOrder, paid, delivered, getOrders } from './orders';

// Crear una instancia de Express


// Definir el número de puerto en el que el servidor escuchará
const PORT = 3000;

// Configurar las rutas para las funciones relacionadas con pedidos

// Ruta para manejar la creación de un pedido usando el método HTTP POST
app.post('/createOrder', createOrder);

// Ruta para manejar la obtención de los pedidos relacionados con un usuario específico usando el método HTTP GET
app.get('/getMyOrders/:id', getMyOrders);

// Ruta para manejar la eliminación de un pedido usando el método HTTP DELETE
app.delete('/deleteOrder/:id', deleteOrder);

// Ruta para manejar la obtención de un pedido específico por su ID usando el método HTTP GET
app.get('/getOrder/:id', getOrder);

// Ruta para manejar la marca de un pedido como pagado usando el método HTTP PUT
app.put('/paid/:id', paid);

// Ruta para manejar la marca de un pedido como entregado usando el método HTTP PUT
app.put('/delivered/:id', delivered);

// Ruta para manejar la obtención de todos los pedidos relacionados con un usuario específico usando el método HTTP GET
app.get('/getOrders/:id', getOrders);

// Iniciar el servidor y hacer que escuche en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



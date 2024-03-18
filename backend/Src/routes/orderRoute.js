import * as order from '../controller/orderController.js';
import express from 'express';

const orderRoute = express.Router();

//Obtener todas las rutas
orderRoute.get('/', order.getAll);
// Ruta para manejar la creación de un pedido usando el método HTTP POST
orderRoute.post('/', order.createOrder);

// Ruta para manejar la obtención de los pedidos relacionados con un usuario específico usando el método HTTP GET
orderRoute.get('/getMyOrders/:id', order.getMyOrders);

// Ruta para manejar la eliminación de un pedido usando el método HTTP DELETE
orderRoute.delete('/:id', order.deleteOrder);

// Ruta para manejar la obtención de un pedido específico por su ID usando el método HTTP GET
orderRoute.get('/getOrder/:id', order.getOrder);

// Ruta para manejar la marca de un pedido como pagado usando el método HTTP PUT
orderRoute.put('/paid/:id', order.paid);

// Ruta para manejar la marca de un pedido como entregado usando el método HTTP PUT
orderRoute.put('/delivered/:id', order.delivered);

// Ruta para manejar la obtención de todos los pedidos relacionados con un usuario específico usando el método HTTP GET
orderRoute.get('/getOrders/:id', order.getOrders);

export default orderRoute;
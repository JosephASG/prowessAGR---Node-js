import * as firebase from 'firebase/app';
import 'firebase/database';
import * as firestore from 'firebase/firestore';
import { fs, storage } from '../database/firebase.js';

// Crear una nueva orden
export const createOrder = async (req, res) => {
  try {
    const newOrderData = req.body;

    // Operaciones en Firebase Realtime Database
    const newOrderRef = firebase.database().ref('orden').push();
    const newOrder = {
      id: newOrderRef.key,
      ...newOrderData
    };
    await newOrderRef.set(newOrder);

    // Operaciones en Firestore
    const docRef = await firestore.addDoc(firestore.collection(fs, 'orden'), newOrderData);

    res.status(201).json({ message: 'New Order Created', order: { id: docRef.id, ...newOrder } });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error al crear la orden.' });
  }
};

// Obtener todas las órdenes para un ID de usuario determinado
export const getMyOrders = async (req, res) => {
  try {
    const userId = String(req.params.userId);

    // Operaciones en Firebase Realtime Database
    const snapshotRealtime = await firebase.database().ref('orden').orderByChild('ord_idcliente').equalTo(userId).once('value');
    const ordersRealtime = snapshotRealtime.val() || [];

    // Operaciones en Firestore
    const querySnapshotFirestore = await firestore.getDocs(
      firestore.query(
        firestore.collection(fs, 'orden'),
        firestore.where('ord_idcliente', '==', userId)
      )
    );
    const ordersFirestore = [];
    querySnapshotFirestore.forEach((ordenDoc) => {
      ordersFirestore.push({ id: ordenDoc.id, ...ordenDoc.data() });
    });

    res.json({ ordersRealtime, ordersFirestore });
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).json({ error: 'Error al obtener las órdenes.' });
  }
};

// Eliminar una orden
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Operaciones en Firebase Realtime Database
    await firebase.database().ref('orden').child(id).remove();

    // Operaciones en Firestore
    await firestore.deleteDoc(firestore.doc(fs, 'orden', id));

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    res.status(500).json({ error: 'Error al eliminar la orden.' });
  }
};

// Resto de las funciones adaptadas para Firebase Realtime Database
// ...

// Ejemplo de función para obtener órdenes por ID de vendedor en Firebase Realtime Database
export const getOrders = async (req, res) => {
  try {
    const snapshot = await firebase.database().ref('orders').orderByChild('sellerId').equalTo(req.params.id).once('value');
    const orders = snapshot.val();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting orders' });
  }
};

// Resto de las funciones adaptadas para Firebase Realtime Database
// ...

// Ejemplo de función para marcar un pedido como pagado en Firebase Realtime Database
export const paid = async (req, res) => {
  const fechaHoraActual = new Date().toISOString();
  try {
    const { id } = req.params;
    const orderRef = firebase.database().ref('orden').child(id);
    const snapshot = await orderRef.once('value');
    const order = snapshot.val();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.isPaid = true;
    order.paidAt = fechaHoraActual;
    await orderRef.set(order);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Resto de las funciones adaptadas para Firebase Realtime Database
// ...

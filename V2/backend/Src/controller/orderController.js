import firebase from 'firebase/app';
import 'firebase/database';

// Reemplace la siguiente configuración con la configuración de su proyecto Firebase
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Create an order in the Firebase Realtime Database
export const createOrder = async (req, res) => {
    try {
      const newOrderRef = database.ref('orders').push();
      const newOrder = {
        id: newOrderRef.key,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        sellerId: req.body.sellerId,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        isPaid: req.body.isPaid,
        isDelivered: req.body.isDelivered,
        deliveredAt: req.body.deliveredAt,
        paidAt: req.body.paidAt,
      };
      await newOrderRef.set(newOrder);
      return res.status(HTTP_STATUS.OK).send({ message: 'New Order Created', order: newOrder });
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error creating order' });
    }
  };
  
  // Obtenga todos los pedidos para un ID de usuario determinado de Firebase Realtime Database
  export const getMyOrders = async (req, res) => {
    try {
      const snapshot = await database.ref('orders').orderByChild('id').equalTo(req.params.id).once('value');
      const orders = snapshot.val();
      return res.status(HTTP_STATUS.OK).send(orders);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error getting orders' });
    }
  };
  
  // Eliminar un pedido de Firebase Realtime Database
  export const deleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
      await database.ref('orders').child(id).remove();
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Obtenga un pedido específico por ID de Firebase Realtime Database
  export const getOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const snapshot = await database.ref('orders').child(id).once('value');
      const order = snapshot.val();
      return res.status(HTTP_STATUS.OK).send(order);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error getting order' });
    }
  };
  
  // Marcar un pedido como pagado en Firebase Realtime Database
  export const paid = async (req, res) => {
    const fechaHoraActual = moment().format('MMMM DD, YYYY HH:mm:ss');
    try {
      const { id } = req.params;
      const orderRef = database.ref('orders').child(id);
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
  
  // Marcar un pedido como entregado en Firebase Realtime Database
  export const delivered = async (req, res) => {
    const fechaHoraActual = moment().format('MMMM DD, YYYY HH:mm:ss');
    try {
      const { id } = req.params;
      const orderRef = database.ref('orders').child(id);
      const snapshot = await orderRef.once('value');
      const order = snapshot.val();
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      order.isDelivered = true;
      order.deliveredAt = fechaHoraActual;
      await orderRef.set(order);
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Obtenga todos los pedidos para un ID de vendedor determinado de Firebase Realtime Database
  export const getOrders = async (req, res) => {
    try {
      const snapshot = await database.ref('orders').orderByChild('sellerId').equalTo(req.params.id).once('value');
      const orders = snapshot.val();
      return res.status(HTTP_STATUS.OK).send(orders);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error getting orders' });
    }
  };
  
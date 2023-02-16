import Order from "../models/orderModel.js";
import HTTP_STATUS from "http-status-codes";

//Estructura metodo post
export const createOrder = async (req, res) => {
  try {
    // 1. Obtiene los elementos del pedido a partir de la solicitud.
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      sellerId: req.body.sellerId,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
    });
    // 2. Guarde el pedido en la base de datos.
    const order = await newOrder.save();
    // 3. Devuelve la información del pedido al cliente.
    return res
      .status(HTTP_STATUS.OK)
      .send({ message: "New Order Created", order });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error creating order",
    });
  }
};

//Obtener todas las ordenes registradas
export const getMyOrders = async (req, res) => {
  try {
    //buscar pedidos por id de usuario
    const orders = await Order.find({ id: req.params.id });
    //retorna los pedidos
    return res.status(HTTP_STATUS.OK).send(orders);
  } catch (error) {
    //mensaje de error de retorno
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting orders",
    });
  }
};

//Obtener mi orden única 
export const getOrder = async (req, res) => {
  //Enviar el pedido con el id coincidente como respuesta
  try {
    const order = await Order.findById(req.params.id);
    return res.status(HTTP_STATUS.OK).send(order);
  } catch (error) {
    //Si no se encuentra el pedido, devuelve un mensaje de error
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting order",
    });
  }
};

//Obtener mis pedidos por Id del vendedor
export const getOrders = async (req, res) => {
  try {
    //Obtener pedidos de la base de datos
    const orders = await Order.find({ sellerId: req.params.id });

    //Enviar pedidos al cliente
    return res.status(HTTP_STATUS.OK).send(orders);
  } catch (error) {
    //Enviar error al cliente
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting orders",
    });
  }
};

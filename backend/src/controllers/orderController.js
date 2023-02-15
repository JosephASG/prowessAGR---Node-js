import Order from "../models/orderModel.js";
import HTTP_STATUS from "http-status-codes";

//Estructura metodo post
export const createOrder = async (req, res) => {
  try {
    // 1. Get the order items from the request.
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
    // 2. Save the order to the database.
    const order = await newOrder.save();
    // 3. Return the order information to the client.
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
    //find orders by user id
    const orders = await Order.find({ id: req.params.id });
    //return orders
    return res.status(HTTP_STATUS.OK).send(orders);
  } catch (error) {
    //return error message
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting orders",
    });
  }
};

//Get my One Order
export const getOrder = async (req, res) => {
  // Send the order with the matching id as a response
  try {
    const order = await Order.findById(req.params.id);
    return res.status(HTTP_STATUS.OK).send(order);
  } catch (error) {
    // If the order wasn't found, return an error message
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting order",
    });
  }
};

//Get my orders by sellerId
export const getOrders = async (req, res) => {
  try {
    // Get orders from database
    const orders = await Order.find({ sellerId: req.params.id });

    // Send orders to client
    return res.status(HTTP_STATUS.OK).send(orders);
  } catch (error) {
    // Send error to client
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting orders",
    });
  }
};

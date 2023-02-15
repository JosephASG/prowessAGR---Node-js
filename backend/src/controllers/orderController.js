import Order from "../models/orderModel.js";
import HTTP_STATUS from "http-status-codes";

//Estructura metodo post
export const createOrder = async (req, res) => {
  try {
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
    const order = await newOrder.save();
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
    const orders = await Order.find({ id: req.params.id });
    return res.status(HTTP_STATUS.OK).send(orders);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting orders",
    });
  }
};

//Obtener ordenes de compra de acuerdo al ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    return res.status(HTTP_STATUS.OK).send(order);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting order",
    });
  }
};

//Obtener las ordenes segun el ID de los vendedores registrados
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params.id });
    return res.status(HTTP_STATUS.OK).send(orders);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting orders",
    });
  }
};

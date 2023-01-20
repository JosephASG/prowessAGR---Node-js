import Order from "../models/orderModel.js";
// PULL IN THE ORDER MODEL i dev

//Post Order
export const postOrder = async (req, res) => {
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
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Get my orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params.id });
    if (!orders) {
      return res
        .status(404)
        .json({ error: `No orders found for this seller by ${id}` });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Get order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.find({});
    return res.send(order);
  } catch (error) {
    return res.status(404).send({ message: "Orden no encontrada" });
  }
};

//Get orders by id
export const getOrders = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await Order.findById(id);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).send({ message: "Orden no encontrada" });
  }
};

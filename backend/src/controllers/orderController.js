import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import HTTP_STATUS from "http-status-codes";

//Post Order
export const createOrder = async (req, res) => {
  try {
    const existingOrder = await Order.findOne({ id: req.body.id });
    if (existingOrder) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Order already exists" });
    }
    // const orderItems = req.body.orderItems;
    // for (const item of orderItems) {
    //   const product = await Product.findById(item.product_id);
    //   item.slug = product.slug;
    //   item.name = product.name;
    //   item.image = product.image;
    //   item.price = product.price;
    //   item.sellerId = product.sellerId;
    //   item.seller = product.seller;
    //   item.sellerImage = product.sellerImage;
    // }

    const newOrder = new Order({
      id: req.body.id,
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      // orderItems: req.body.orderItems,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      sellerId: req.body.sellerId,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,

      // orderItems: req.body.orderItems,
      // id: req.body.id,
      // name: req.body.name,
      // email: req.body.email,
      // address: req.body.address,
      // phone: req.body.phone,
      // sellerId: req.body.sellerId,
      // itemsPrice: req.body.itemsPrice,
      // taxPrice: req.body.taxPrice,
      // totalPrice: req.body.totalPrice,
      // isPaid: req.body.isPaid,
      // paidAt: req.body.paidAt,
      // isDelivered: req.body.isDelivered,
      // deliveredAt: req.body.deliveredAt,
    });

    await newOrder.save();

    return res
      .status(HTTP_STATUS.OK)
      .send({ message: "New order created", newOrder });
  } catch (error) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: "Error creating order" });
  }
};
// export const createOrder = async (req, res) => {
//   try {
//     const orderItems = req.body.orderItems;
//     for (const item of orderItems) {
//       const product = await Product.findById(item.product_id);
//       item.slug = product.slug;
//       item.name = product.name;
//       item.image = product.image;
//       item.price = product.price;
//       item.sellerId = product.sellerId;
//       item.seller = product.seller;
//       item.sellerImage = product.sellerImage;
//     }

//     const newOrder = new Order({
//       id: req.body.id,
//       orderItems: req.body.orderItems,
//       name: req.body.name,
//       email: req.body.email,
//       address: req.body.address,
//       phone: req.body.phone,
//       sellerId: req.body.sellerId,
//       itemsPrice: req.body.itemsPrice,
//       taxPrice: req.body.taxPrice,
//       totalPrice: req.body.totalPrice,

//       // orderItems: req.body.orderItems,
//       // id: req.body.id,
//       // name: req.body.name,
//       // email: req.body.email,
//       // address: req.body.address,
//       // phone: req.body.phone,
//       // sellerId: req.body.sellerId,
//       // itemsPrice: req.body.itemsPrice,
//       // taxPrice: req.body.taxPrice,
//       // totalPrice: req.body.totalPrice,
//       // isPaid: req.body.isPaid,
//       // paidAt: req.body.paidAt,
//       // isDelivered: req.body.isDelivered,
//       // deliveredAt: req.body.deliveredAt,
//     });
//     await newOrder.save();
//     return res
//       .status(HTTP_STATUS.OK)
//       .send({ message: "New order created", newOrder });
//   } catch (error) {
//     return res
//       .status(HTTP_STATUS.BAD_REQUEST)
//       .send({ message: "Error creating order" });
//   }
// };

//Get my orders

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params._id });
    if (!orders) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "No orders found for this seller",
      });
    }
    res.status(HTTP_STATUS.OK).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Error getting orders for this seller",
    });
  }
};

//Get order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.find({});
    return res.status(HTTP_STATUS.OK).send(order);
  } catch (error) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .send({ message: "Orden no encontrada" });
  }
};

//Get orders by id
export const getOrders = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await Order.findById(id);
    return res.status(HTTP_STATUS.OK).json(orders);
  } catch (error) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .send({ message: "Orden no encontrada" });
  }
};

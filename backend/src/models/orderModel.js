import mongoose from "mongoose";

//Creacion de tabla ORDENES
const OrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: {
          public_id: { type: String, required: true },
          secure_url: { type: String, required: true },
        },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        seller: { type: String, required: true },
        sellerId: { type: String, required: true },
        sellerImage: { type: String, required: true },
      },
    ],
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    sellerId: [{ type: String, required: true }],
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    paidAt: { type: String, required: true },
    isDelivered: { type: Boolean, required: true },
    deliveredAt: { type: String, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//Crear modelo para la Orden
const Order = mongoose.model("Order", OrderSchema);

//Exportar modelo de pedido
export default Order;
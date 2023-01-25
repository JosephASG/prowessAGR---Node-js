import mongoose from "mongoose";
import Product from "../models/productModel.js";

const OrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        image: {
          public_id: { type: String },
          secure_url: { type: String },
        },
        sellerId: { type: String, required: true },
        seller: { type: String, required: true },
        sellerImage: { type: String, required: true },
      },
    ],
    //id: { type: String, unique: true, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    sellerId: { type: String, required: true },
    itemsPrice: { type: Number, required: false },
    taxPrice: { type: Number, required: false },
    totalPrice: { type: Number, required: false },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

OrderSchema.pre("save", async function (next) {
  const orderItems = this.orderItems;
  for (const item of orderItems) {
    const product = await Product.findById(item.product_id);
    item.slug = product.slug;
    item.name = product.name;
    item.image = product.image;
    item.price = product.price;
    item.sellerId = product.sellerId;
    item.seller = product.seller;
    item.sellerImage = product.sellerImage;
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;

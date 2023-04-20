import mongoose from "mongoose";

//para crear una tabla en la base de datos para el producto
const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true},
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      public_id: { type: String },
      secure_url: { type: String },
    },
    sellerId: { type: String, required: true },
    seller: { type: String, required: true },
    sellerImage: { type: String, required: true },
  },
  {
    timestamps: true, //para fechas
    versionKey: false, //para version
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
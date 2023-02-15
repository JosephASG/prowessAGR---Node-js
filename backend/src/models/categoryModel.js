import mongoose from "mongoose";

// Esquema de creacion de tabla USUARIO en la base de datos
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true, //for date
    versionKey: false, //for version
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;

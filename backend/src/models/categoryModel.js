import mongoose from "mongoose";

//Para crear Tabla en BD para Usuario
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
  },
  {
    timestamps: true, // insertar automáticamente marcas de tiempo en cada documento
    versionKey: false, // desactivar el control de versiones
  }
);

// crear modelo mongoose para Usuario
const Category = mongoose.model("Category", CategorySchema);
export default Category;

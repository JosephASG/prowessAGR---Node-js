import express from "express";
import data from "../data.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

//Guardar datos en la tabla -> base de datos

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await User.remove({});
  const createdUser = await User.insertMany(data.users); 
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  await Category.remove({});
  const createdCategory = await Category.insertMany(data.category);
  res.send({ createdUser, createdProduct, createdCategory });
});

export default seedRouter;

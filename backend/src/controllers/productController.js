import Products from "../models/productModel.js";
import {
  uploadImage,
  deleteImage,
} from "../utils/cloudinaryConfig.js";
import fs from "fs-extra";

//CREATE PRODUCT
export const postProduct = async (req, res) => {
  if (
    (!req.body.name,
    !req.body.slug,
    !req.body.category,
    !req.body.description,
    !req.body.price)
  )
    return res.status(400).json({ message: "All fields are required" });
  try {
    const newProduct = new Products(req.body);
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      newProduct.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET PRODUCT BY SLUG
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
//GET PRODUCT BY SELLER ID
export const getProductBySellerId = async (req, res) => {
  try {
    const product = await Products.find({ sellerId: req.params.id });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    // obtein product id from params and search user by id in DB
    const { id: productId } = req.params;
    // search product by id in DB
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // update product data with data from request body
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.description = req.body.description;
    product.price = req.body.price;
    // if image is uploaded, delete old image from cloudinary and upload new image
    if (req.files?.image) {
      if (product.image?.public_id) {
        await deleteImage(product.image.public_id);
      }
      const result = await uploadImage(req.files.image.tempFilePath);
      product.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    // save product in DB and return updated product
    const updatedProduct = await product.save();
    return res.status(200).json({ product: updatedProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product does not exits" });

    if (product.image?.public_id) {
      await deleteImage(product.image.public_id);
    }
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

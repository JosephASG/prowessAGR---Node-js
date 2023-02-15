import Products from "../models/productModel.js";
import {
  uploadImageProduct,
  deleteImageProduct,
} from "../utils/cloudinaryConfig.js";
import HTTP_STATUS from "http-status-codes";
import fs from "fs-extra";

//Crear un producto
export const postProduct = async (req, res) => {
  // check if all fields are sent
  if (
    (!req.body.name,
    !req.body.slug,
    !req.body.category,
    !req.body.description,
    !req.body.price)
  )
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "All fields are required" });
  try {
    // create new product
    const newProduct = new Products(req.body);
    // if image is uploaded, upload image to cloudinary
    if (req.files?.image) {
      const result = await uploadImageProduct(req.files.image.tempFilePath);
      newProduct.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }
    // save product in DB and return saved product
    const savedProduct = await newProduct.save();
    // return saved product with a 201 status code
    return res.status(HTTP_STATUS.CREATED).json(savedProduct);
  } catch (error) {
    // if there is an error, return error with a 500 status code
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  }
};

//Obtener informacion de todos los productos registrados
export const getProducts = async (req, res) => {
  // Try to get all the products
  try {
    const products = await Products.find();
    // If there are products, return them with a 200 status code
    return res.status(HTTP_STATUS.OK).json(products);
  } catch (error) {
    // If there was an error, return the error with a 500 status code
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  }
};

//Obtener producto segun su peso en kilogramos
export const getProductBySlug = async (req, res) => {
  try {
    //find product by slug
    const product = await Products.findOne({ slug: req.params.slug });
    //if there is no product
    if (!product) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    //return product
    return res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    //if there is an error
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  }
};
//Obtener los productos de acuerdo al ID del vendedor
export const getProductBySellerId = async (req, res) => {
  try {
    const product = await Products.find({ sellerId: req.params.id });
    return res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  }
};

//Obtener los productos por ID
export const getProductById = async (req, res) => {
  try {
    // Get the product from the database
    const product = await Products.findById(req.params.id);

    // If no product is found, return a 404
    if (!product) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    // If a product is found, return the product in a 200
    return res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    // If there is an error, return a 500
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(error);
  }
};

//Actualizar producto
export const updateProduct = async (req, res) => {
 // comprobar si se envían todos los campos
  if (
    (!req.body.name,
    !req.body.slug,
    !req.body.category,
    !req.body.description,
    !req.body.price)
  )
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "All fields are required" });
  try {
    //Obtenga la identificación del producto de los parámetros y busque el usuario por identificación en la base de datos
    const { id: productId } = req.params;
    //Buscar producto por id en la base de datos
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    //actualizar los datos del producto con los datos del cuerpo de la solicitud
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.description = req.body.description;
    product.price = req.body.price;
    //si se carga la imagen, elimine la imagen anterior de cloudinary y cargue una nueva imagen
    if (req.files?.image) {
      if (product.image?.public_id) {
        await deleteImageProduct(product.image.public_id);
      }
      // upload new image to cloudinary
      const result = await uploadImageProduct(req.files.image.tempFilePath);
      product.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    // guardar el producto en la base de datos y devolver el producto actualizado
    const updatedProduct = await product.save();
    return res.status(HTTP_STATUS.OK).json({ product: updatedProduct });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};

//Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    // Eliminar imagen de la base de datos cloudinary 
    if (product.image?.public_id) {
      await deleteImageProduct(product.image.public_id);
    }
    // Eliminar productos en la base de datos
    await product.remove();
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error });
  }
};

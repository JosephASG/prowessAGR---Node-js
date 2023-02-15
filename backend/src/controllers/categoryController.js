import Category from "../models/categoryModel.js";
import HTTP_STATUS from "http-status-codes";

//Obtener categoria por el Id
export const getCategoryById = async (req, res) => {
  // Get the id from the request
  const id = req.params.id;
  try {
    // Find the category by id
    const category = await Category.findById(id);
    // If the category is not found, return a 404 status
    if (!category) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `No category found by id ${id}` });
    }
    // If the category is found, return a 200 status
    return res.status(HTTP_STATUS.OK).json(category);
  } catch (error) {
    // If there is an error, return a 500 status
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    // Get all categories from the database
    const categories = await Category.find();

    // If no categories are found, send a 404 response
    if (!categories) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "No categories found" });
    }

    // Send the found categories in a JSON response
    return res.status(HTTP_STATUS.OK).json(categories);
  } catch (error) {
    // If there is an error, send the error message in a JSON response
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

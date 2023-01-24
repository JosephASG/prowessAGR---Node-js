import Category from "../models/categoryModel.js";
import HTTP_STATUS from "http-status-codes";

//GET BY ID
export const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `No category found by id ${id}` });
    }
    return res.status(HTTP_STATUS.OK).json(category);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "No categories found" });
    }
    return res.status(HTTP_STATUS.OK).json(categories);
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
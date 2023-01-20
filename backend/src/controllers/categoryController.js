import Category from "../models/categoryModel.js";

//GET BY ID
export const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: `No category found by id ${id}` });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import Category from "../models/categoryModel.js";
import HTTP_STATUS from "http-status-codes";

//Obtener categoria por el Id
export const getCategoryById = async (req, res) => {
  // Obtener el id de la solicitud
  const id = req.params.id;
  try {
    // Buscar la categoria por el Id
    const category = await Category.findById(id);
    // Si no se encuentra la categoría, devuelve un estado 404
    if (!category) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `No category found by id ${id}` });
    }
    // Si se encuentra la categoría, devuelve un estado 200
    return res.status(HTTP_STATUS.OK).json(category);
  } catch (error) {
    // Si hay un error, devuelve un estado 500
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

//OBTENER TODAS LAS CATEGORÍAS
export const getCategories = async (req, res) => {
  try {
    // Obtener todas las categorías de la base de datos
    const categories = await Category.find();

    // Si no se encuentra ninguna categoría, envía una respuesta 404
    if (!categories) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "No categories found" });
    }

    // Enviar las categorías encontradas en una respuesta JSON
    return res.status(HTTP_STATUS.OK).json(categories); 
  } catch (error) {
    // Si se produce un error, envíe el mensaje de error en formato JSON
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

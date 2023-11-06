import axios from "axios"
const WEBURL = process.env.REACT_APP_API_URL

export const getCategories = async (token) => {
    try {
      const response = await axios.get(`${WEBURL}fb/categoria/get`, {
        headers: {
          token: token,
        },
      });
      return response
    } catch (error) {
      console.error('Error al cargar las categorías', error);
    }
  }

export const deleteCategory = async (categoryId, token) => {
    try{
        const response = await axios.delete(`${WEBURL}fb/categoria/delete/${categoryId}`, {
            headers: {
                token: token,
            },
        });
        return response
    } 
    catch (error) {
        console.error('Error al eliminar la categoría en el servidor');
    }
}

  
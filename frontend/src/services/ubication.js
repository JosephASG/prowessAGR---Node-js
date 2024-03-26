import axios from "axios"
const WEBURL = process.env.REACT_APP_API_URL

export const provincesApi = async() => {
    try {
        const response = await axios.get(`${WEBURL}fb/ubicacion/`);
        return response
    } catch (error){
        console.error('Error al cargar las provincias', error);
    }
}
import axios from "axios"


export const checkToken = async(token) => {
    try{
        const response = await axios.get('http://localhost:5000/fb/usuario',{
            headers: {
              token: token,
            },
          })
        return response
    }    catch(error){
        console.log(error)
    }
}
import axios from 'axios';

const WEBURL = process.env.REACT_APP_API_URL;

export const sendMail = async (emailData) => {
  try {
    const response = await axios.post(`${WEBURL}fb/mailer/send-mail-invoice`, emailData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error; 
  }
};



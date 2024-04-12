import { validarCedulaEcuatoriana } from "./validator";
import { provincesApi } from "services/ubication";

export const handleCedulaBlur = (value, tipoDocumento, setIsCedulaValid) => {
  
  console.log("Tipo enviado", tipoDocumento);
  if (tipoDocumento === "cedula") {
    const isValid = validarCedulaEcuatoriana(value);
    setIsCedulaValid(isValid);
  } else if (tipoDocumento === "ruc") {
    if (
      value.length === 13 &&
      validarCedulaEcuatoriana(value.substring(0, 10)) &&
      value.endsWith("001")
    ) {
      setIsCedulaValid(true);
    } else {
      setIsCedulaValid(false);
    }
  } else if (tipoDocumento === "pasaporte") {
    setIsCedulaValid(true);
  }
};

export const checkPasswordStrength = (password) => {
  const length = password.length;
  const hasNumbers = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (length >= 8 && hasNumbers && hasUpper && hasLower && hasSpecialChars) {
    return "Muy alta";
  } else if (
    length >= 6 &&
    hasNumbers &&
    (hasUpper || hasLower) &&
    hasSpecialChars
  ) {
    return "Alta";
  } else if (length >= 6) {
    return "Media";
  } else {
    return "Baja";
  }
};

export const fetchProvinces = async (setProvinces) => {
  try {
    const response = await provincesApi();
    if (response.data && response.data.message) {
      const extractedProvinces = Object.keys(response.data.message).map(
        (key) => {
          const provinceData = response.data.message[key];
          return {
            name: provinceData.provincia,
            cities: Object.keys(provinceData.cantones).map(
              (cantonKey) => provinceData.cantones[cantonKey].canton
            ),
          };
        }
      );
      setProvinces(extractedProvinces);
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error fetching provinces:", error);
    setProvinces([]);
  }
};

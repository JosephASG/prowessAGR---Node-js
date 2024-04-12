export const validarCedulaEcuatoriana = (cedula) => {
  if (cedula.length === 10 && /^[0-9]+$/.test(cedula)) {
    var digitos = cedula.substr(0, 9);
    var suma = 0;

    for (var i = 0; i < digitos.length; i++) {
      var digito = parseInt(digitos[i]);
      if (i % 2 === 0) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }
      suma += digito;
    }

    var verificador = 10 - (suma % 10);
    if (verificador === 10) {
      verificador = 0;
    }

    var ultimoDigito = parseInt(cedula[9]);

    return verificador === ultimoDigito;
  } else if (
    (cedula.length === 8 || cedula.length === 9) &&
    /^[A-Z0-9]+$/.test(cedula)
  ) {
    return true;
  } else {
    return false;
  }
};

export const emailValidationRegex = () => {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
};

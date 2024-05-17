import React, { useState } from "react"; // Importa React y el hook useState desde React.
import { Form, FormControl } from "react-bootstrap"; // Importa los componentes Form y FormControl desde react-bootstrap.

// Componente funcional UserSearchBox que recibe la prop onSearch.
const UserSearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState(""); // Define el estado local 'query' con un valor inicial de cadena vacía.

  // Función manejadora para el cambio de valor en el input.
  const handleInputChange = (event) => {
    const newQuery = event.target.value; // Obtiene el nuevo valor del input.
    setQuery(newQuery); // Actualiza el estado 'query' con el nuevo valor.
    onSearch(newQuery); // Llama a la función onSearch con el nuevo valor.
  };

  // Renderiza el formulario de búsqueda.
  return (
    <Form inline className="mb-4">
      <FormControl
        type="text"
        placeholder="Ingrese Nombre o Numero de Identificacion (C.I.)" // Placeholder del input.
        className="mr-sm-2"
        value={query} // Asocia el valor del input con el estado 'query'.
        onChange={handleInputChange} // Asigna el manejador de cambio al input.
      />
    </Form>
  );
};

export default UserSearchBox; // Exporta el componente UserSearchBox para su uso en otros archivos.

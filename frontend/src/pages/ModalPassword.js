// Importaciones
import React from 'react';

// Declaración de componente
const ModalPassword = ({ onClose, children }) => {
  return (
    <article className="modal-isOpen">
      <div className="modalContainer">
        <button className="modal-close">X</button>
        {children}
      </div>
    </article>
  );
};

// Exportación del componente
export default ModalPassword;
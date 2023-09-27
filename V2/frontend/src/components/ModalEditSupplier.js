import React, { useState, useEffect } from 'react';

const ModalEditSupplier = ({ isOpen, onClose, supplierToEdit, handleEdit, children }) => {
  const initialSupplier = supplierToEdit ? supplierToEdit : {
    pro_nombre: "",
    pro_precio: 0,
    pro_stock: 0,
    pro_descripcion: "",
    pro_categoria: "",
  };

  const [editedSupplier, setEditedSupplier] = useState(initialSupplier);

  useEffect(() => {
    // Cuando supplierToEdit cambia, actualiza el estado del modal
    if (supplierToEdit) {
      setEditedSupplier(supplierToEdit);
    }
  }, [supplierToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSupplier({
      ...editedSupplier,
      [name]: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    handleEdit(editedSupplier);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-supplier">
        <div className='form-container'>
          <form className='modal-form' onSubmit={onSave}>
            <div className="form-group-pair">
              <div>
                <label htmlFor="pro_nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="pro_nombre"
                  value={editedSupplier.pro_nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="pro_precio">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="pro_precio"
                  value={editedSupplier.pro_precio}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group-pair">
              <div>
                <label htmlFor="pro_stock">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="pro_stock"
                  value={editedSupplier.pro_stock}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="pro_descripcion">Descripción</label>
                <textarea
                  className="form-control"
                  name="pro_descripcion"
                  value={editedSupplier.pro_descripcion}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='btn-add-container'>
              <label htmlFor="pro_categoria">Categoría:</label>
                  <select
                    id="pro_categoria"
                    name="pro_categoria"
                    value={editedSupplier.pro_categoria}
                    onChange={handleInputChange}
                  >
                    <option value="Frutas">Frutas</option>
                    <option value="Verduras">Verduras</option>
                    <option value="Cereales">Cereales</option>
                    <option value="Hortalizas">Hortalizas</option>
                  </select>
              </div>
            <div className="form-group">
              <button type="submit" className="btn-save">Guardar</button>
            </div>
          </form>
        </div>
        <span className="modal-close-supplier" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default ModalEditSupplier;

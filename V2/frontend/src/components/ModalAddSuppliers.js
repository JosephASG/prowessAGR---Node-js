import React, { useState, useEffect } from 'react';
import './ModalAddSupplier.css';

const ModalAddSuppliers = ({ isOpen, onClose }) => {
  const [newSupplier, setNewSupplier] = useState({
    pro_nombre: '',
    pro_precio: '',
    pro_stock: '',
    pro_descripcion: '',
    pro_categoria: '',
  });

  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      body.classList.add('modal-open');
      return () => {
        body.classList.remove('modal-open');
      };
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({
      ...newSupplier,
      [name]: value,
    });
  };

  const handleSave = () => {
    fetch('http://localhost:5000/fb/proveedor/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSupplier),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
        } else {
          console.error('Error al agregar el proveedor en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al agregar el proveedor', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-supplier">
        <div className='form-container'>
          <form className='modal-form'>
            <div className="form-group-pair">
              <div>
                <label htmlFor="pro_nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="pro_nombre"
                  value={newSupplier.pro_nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="pro_precio">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="pro_precio"
                  value={newSupplier.pro_precio}
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
                  value={newSupplier.pro_stock}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div>
                  <label htmlFor="pro_descripcion">Descripción</label>
                  <textarea
                    className="form-control"
                    name="pro_descripcion"
                    value={newSupplier.pro_descripcion}
                    onChange={handleInputChange}
                  />
                </div>
              </div>  
            </div>

            <div className='btn-add-container'>
              <label htmlFor="pro_categoria">Categoría:</label>
                  <select
                    id="pro_categoria"
                    name="pro_categoria"
                    value={newSupplier.pro_categoria}
                    onChange={handleInputChange}
                  >
                    <option value="Frutas">Frutas</option>
                    <option value="Verduras">Verduras</option>
                    <option value="Cereales">Cereales</option>
                    <option value="Hortalizas">Hortalizas</option>
                  </select>
              </div>

        <div className='btn-add-container'>


      </div>
            <div className="form-group-pair">
              <div>
                <label htmlFor="pro_imagen">Imagen</label>
                <input
                  type="file"
                  className="form-control"
                  name="pro_imagen"
                  value={newSupplier.pro_imagen}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className='btn-save-container' onClick={handleSave} >Guardar</label>
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

export default ModalAddSuppliers;

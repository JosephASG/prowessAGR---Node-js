import React, { useState, useEffect } from 'react';
import './ModalAddProducts.css';

const ModalAddProducts = ({ isOpen, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    pro_nombre: '',
    pro_precio: '',
    pro_stock: '',
    pro_descripcion: '',
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
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSave = () => {
    fetch('http://localhost:5000/fb/producto/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
        } else {
          console.error('Error al agregar el producto en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al agregar el producto', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-product">
        <div className='form-container'>
          <form className='modal-form'>
            <div className="form-group-pair">
              <div>
                <label htmlFor="pro_nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="pro_nombre"
                  value={newProduct.pro_nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="pro_precio">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="pro_precio"
                  value={newProduct.pro_precio}
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
                  value={newProduct.pro_stock}
                  onChange={handleInputChange}
                />
              </div>
              <div>

                <div>
                  <label htmlFor="pro_descripcion">Descripción</label>
                  <textarea
                    className="form-control"
                    name="pro_descripcion"
                    value={newProduct.pro_descripcion}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className='btn-save-container' onClick={handleSave} >Guardar</label>
            </div>
          </form>
        </div>
        <span className="modal-close-product" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default ModalAddProducts;

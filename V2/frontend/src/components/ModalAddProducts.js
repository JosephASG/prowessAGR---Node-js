import React, { useState, useEffect } from 'react';
import './ModalAddProducts.css';

const ModalAddProducts = ({ isOpen, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    pro_nombre: '',
    pro_precio: '',
    pro_stock: '',
    pro_descripcion: '',
    pro_categoria: '',
  });
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías

  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      body.classList.add('modal-open');
      return () => {
        body.classList.remove('modal-open');
      };
    }

    // Aquí hacemos la solicitud para obtener las categorías cuando el componente se monta
    fetch('http://localhost:5000/fb/categoria/get')
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error('Error al obtener las categorías', error);
      });
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

            <div className='btn-add-container'>

            <label htmlFor="pro_medida">Medida:</label>
                  <select
                    id="pro_medida"
                    name="pro_medida"
                    value={newProduct.pro_medida}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="Kg">Kilogramo</option>
                    <option value="Gr">Gramo</option>
                    <option value="Lb">Libra</option>
                    <option value="Oz">Onza</option>
                    <option value="Ud">Unidad</option>
                  </select>

              <label htmlFor="pro_categoria">Categoría:</label>
              <select
                id="pro_categoria"
                name="pro_categoria"
                value={newProduct.pro_categoria}
                onChange={handleInputChange}
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.cat_nombre}>
                    {categoria.cat_nombre}
                  </option>
                ))}
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
                  value={newProduct.pro_imagen}
                  onChange={handleInputChange}
                />
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

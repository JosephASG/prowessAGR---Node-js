import React, { useState, useEffect } from 'react';

const ModalEditVendor = ({ isOpen, onClose, vendorData, handleEditVendor }) => {
  const [editedVendor, setEditedVendor] = useState(vendorData || {});

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
    setEditedVendor({
      ...editedVendor,
      [name]: value,
    });
  };

  const handleSave = () => {
    fetch('http://localhost:5000/fb/vendedor/updateSeller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedVendor),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
        } else {
          console.error('Error al editar el vendedor en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error de red al editar el vendedor', error);
      });
  };

  const onSave = (e) => {
    e.preventDefault();
    // Call the handleEditVendor function and pass the edited vendor data as an argument
    handleEditVendor(editedVendor);
    onClose(); // Close the modal after editing the vendor
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-vendor">
        <div className='form-container'>
          <form className='modal-form' onSubmit={onSave}>
            <div className="form-group-pair">
              <div>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editedVendor.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="city">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={editedVendor.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={editedVendor.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                value={editedVendor.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="whatsappNumber">Número de WhatsApp</label>
              <input
                type="text"
                className="form-control"
                name="whatsappNumber"
                value={editedVendor.whatsappNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">URL de la Imagen</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={editedVendor.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className='btn-save-container' onClick={handleSave}>Guardar</label>
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

export default ModalEditVendor;
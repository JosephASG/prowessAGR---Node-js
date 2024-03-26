import React from 'react'
import ModalPassword from './ModalPassword'

const Modals = ({title}) => {
  return (
    <div>
        <h2>{title}</h2>
        <ModalPassword>
          <p>Por favor, ingrese el código enviado a su correo electrónico</p>
          <input type="text" />
        </ModalPassword>
    </div>
  )
}

export default Modals
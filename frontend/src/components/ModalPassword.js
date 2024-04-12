import React from "react";
import "./ModalPassword.css";

const ModalPassword = ({ children, handleCancelModal }) => {
  return (
    <article className="modalPassword">
      <div className="modalPasswordContainer" style={{backgroundColor:'seagreen'}}>
        <button
          className="modalPasswordClose"
          onClick={() => handleCancelModal()}
        >
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default ModalPassword;

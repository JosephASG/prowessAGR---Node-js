//Recibira un numero y devolverá un buton linkeado al whatsapp del numero
import React from "react";

function WhatsButton({ number, message }) {
    return (

        <a href={`https://wa.me/${number}`}>
            <button className="btn btn-success">Contactar</button>
        </a>

    );
}

export default WhatsButton;
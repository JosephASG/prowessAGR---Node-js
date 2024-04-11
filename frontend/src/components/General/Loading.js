import React from "react";
import { Spinner, Button } from "react-bootstrap";
import './Loading.css'

function Loading() {
  return (
    <div className="screenLoading">
      <Button
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        variant="primary"
        disabled
      >
        <Spinner animation="border" variant="info" />
        <span>Cargando...</span>
      </Button>
    </div>
  );
}

export default Loading;

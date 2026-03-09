import React from "react";

function CardMesa(props) {

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    width: "180px",
    textAlign: "center",
    margin: "10px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer"
  };

  const tituloStyle = {
    margin: "0",
    color: "#2c3e50"
  };

  const textoStyle = {
    color: "#555",
    fontSize: "14px"
  };

  return (
    <div style={cardStyle} onClick={props.alElegir}>
      <h3 style={tituloStyle}>{props.nombre}</h3>
      <p style={textoStyle}>Zona: {props.zona}</p>
      <p style={textoStyle}>Capacidad: {props.capacidad}</p>
    </div>
  );
}

export default CardMesa;
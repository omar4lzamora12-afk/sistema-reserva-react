import React, { useState, useEffect } from "react";
import CardMesa from "./CardMesa";

function ReservaWeb() {
  // 1. Estados para cada dato del cliente (Hook useState)
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoDoc, setTipoDoc] = useState("DNI");
  const [numDoc, setNumDoc] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  
  const [mesaSeleccionada, setMesaSeleccionada] = useState("");

  // Hook useEffect simulando la carga
  useEffect(() => {
    console.log("Cargando mesas...");
  }, []);

  const mesas = [
    { id: 1, nombre: "Mesa 01", zona: "Terraza VIP", capacidad: 4 },
    { id: 2, nombre: "Mesa 02", zona: "Terraza VIP", capacidad: 2 },
    { id: 3, nombre: "Mesa 03", zona: "Salón Interior", capacidad: 6 },
    { id: 4, nombre: "Mesa 04", zona: "Salón Interior", capacidad: 4 },
    { id: 5, nombre: "Mesa 05", zona: "Patio", capacidad: 8 },
    { id: 6, nombre: "Mesa 06", zona: "Barra", capacidad: 2 }
  ];

  // --- ESTILOS EN LÍNEA (Reglas JSX) ---
  const contenedorPrincipal = { padding: "40px", fontFamily: "Arial" };
  const tituloPrincipal = { textAlign: "center", marginBottom: "40px" };
  const columnas = { display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" };
  const formulario = { width: "450px", border: "1px solid #ddd", padding: "20px", borderRadius: "10px", backgroundColor: "#f8f8f8" };
  const mesasContenedor = { width: "450px" };
  const gridMesas = { display: "flex", flexWrap: "wrap" };
  
  const botonStyle = { width: "100%", padding: "12px", backgroundColor: "#e67e22", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" };
  
  // Estilos nuevos para las columnas del formulario
  const filaInput = { display: "flex", gap: "15px", marginBottom: "15px" };
  const columnaUnica = { flex: 1 }; 
  const labelStyle = { display: "block", marginBottom: "5px", fontSize: "14px", color: "#333", fontWeight: "bold" };
  const inputStyle = { width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" };

  return (
    <div style={contenedorPrincipal}>
      <h2 style={tituloPrincipal}>Nueva Reserva</h2>

      <div style={columnas}>
        {/* --- Formulario de Cliente --- */}
        <div style={formulario}>
          <h3 style={{ marginTop: 0 }}>Datos del Cliente</h3>

          {/* Fila 1: Nombres y Apellidos en columnas */}
          <div style={filaInput}>
            <div style={columnaUnica}>
              <label style={labelStyle}>Nombres</label>
              <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} style={inputStyle} />
            </div>
            <div style={columnaUnica}>
              <label style={labelStyle}>Apellidos</label>
              <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} style={inputStyle} />
            </div>
          </div>

          {/* Fila 2: Tipo de Doc y Número de Doc en columnas */}
          <div style={filaInput}>
            <div style={columnaUnica}>
              <label style={labelStyle}>Tipo Doc.</label>
              <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} style={inputStyle}>
                <option value="DNI">DNI</option>
                <option value="CE">C.E.</option>
                <option value="PASAPORTE">Pasaporte</option>
              </select>
            </div>
            <div style={columnaUnica}>
              <label style={labelStyle}>N° Documento</label>
              <input type="text" value={numDoc} onChange={(e) => setNumDoc(e.target.value)} style={inputStyle} />
            </div>
          </div>

          {/* Fila 3: Teléfono y Correo en columnas */}
          <div style={filaInput}>
            <div style={columnaUnica}>
              <label style={labelStyle}>Celular</label>
              <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={inputStyle} />
            </div>
            <div style={columnaUnica}>
              <label style={labelStyle}>Correo Electrónico</label>
              <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <button style={botonStyle} onClick={() => alert(`Reserva confirmada para ${nombres} en la ${mesaSeleccionada}`)}>
            Confirmar Reserva
          </button>

          <p style={{ marginTop: "15px", color: "#e67e22", fontWeight: "bold" }}>
            Mesa seleccionada: {mesaSeleccionada || "Ninguna"}
          </p>
        </div>

        {/* --- CROQUIS DE MESAS --- */}
        <div style={mesasContenedor}>
          <h3 style={{ marginTop: 0 }}>Selección de Mesa</h3>
          <div style={gridMesas}>
            {mesas.map((mesa) => (
              <CardMesa
                key={mesa.id}
                nombre={mesa.nombre}
                zona={mesa.zona}
                capacidad={mesa.capacidad}
                alElegir={() => setMesaSeleccionada(mesa.nombre)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReservaWeb;
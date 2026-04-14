export function TarjetaMesa({ mesa, seleccionada, onClick }) {
  const getEstado = () => {
    if (mesa.ocupada)   return "🎀";  // ocupada por otro
    if (seleccionada)   return "🎀";  // elegida por el usuario
    return "□";                        // libre
  };

  return (
    <div
      onClick={onClick}
      className={`tarjeta-mesa 
        ${mesa.ocupada   ? "ocupada"      : ""}
        ${seleccionada   ? "seleccionada" : ""}
      `}
    >
      <span className="mesa-icono">🪑</span>
      <span className="mesa-id">{mesa.id}</span>
      <span className="mesa-estado">{getEstado()}</span>
    </div>
  );
}
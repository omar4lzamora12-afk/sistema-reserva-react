import { createContext, useContext, useState } from "react";

const ReservaContext = createContext();

export function ReservaProvider({ children }) {
  const [reserva, setReserva] = useState({
    fecha:         "",
    personas:      1,
    hora:          "",
    nombreReserva: "",
    mesa:          null,
    cliente: {
      nombre: "", telefono: "", correo: "", dni: "",
    },
  });

  // ── Lista global de reservas — compartida con el admin ──
  const [reservas, setReservas] = useState([]);

  function actualizarReserva(nuevoDato) {
    setReserva(prev => ({ ...prev, ...nuevoDato }));
  }

  // Llamada desde PantallaExito al confirmar
  function agregarReserva(nuevaReserva) {
    setReservas(prev => [
      ...prev,
      {
        id:       Date.now(),           // id único por timestamp
        nombre:   nuevaReserva.cliente.nombre,
        hora:     nuevaReserva.hora,
        personas: nuevaReserva.personas,
        mesa:     nuevaReserva.mesa?.id || null,
        estado:   "pendiente",
        telefono: nuevaReserva.cliente.telefono,
        correo:   nuevaReserva.cliente.correo,
        dni:      nuevaReserva.cliente.dni,
        fecha:    nuevaReserva.fecha,
      },
    ]);
  }

  // Resetea el formulario para una nueva reserva
  function resetReserva() {
    setReserva({
      fecha: "", personas: 1, hora: "",
      nombreReserva: "", mesa: null,
      cliente: { nombre: "", telefono: "", correo: "", dni: "" },
    });
  }

  return (
    <ReservaContext.Provider value={{
      reserva,
      actualizarReserva,
      resetReserva,
      reservas,
      setReservas,
      agregarReserva,
    }}>
      {children}
    </ReservaContext.Provider>
  );
}

export function useReserva() {
  return useContext(ReservaContext);
}
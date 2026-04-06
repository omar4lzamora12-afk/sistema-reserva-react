import { useState } from "react";
import { useReserva } from "../Context/ReservaContext";
import { LayoutReserva } from "../Components/LayoutReserva";

export function PantallaExito({ onReset }) {
  const { reserva, agregarReserva, resetReserva } = useReserva();
  const [cancelada,  setCancelada]  = useState(false);
  const [yaGuardado, setYaGuardado] = useState(false);

  // Guarda en el Context la primera vez que se muestra esta pantalla
  if (!yaGuardado) {
    agregarReserva(reserva);
    setYaGuardado(true);
  }

  function hacerOtraReserva() {
    resetReserva();
    onReset();
  }

  // Vista cancelada
  if (cancelada) {
    return (
      <LayoutReserva>
        <div className="exito-wrapper">
          <div className="exito-icono cancelado">✕</div>
          <h2 className="exito-titulo">¡Reserva Cancelada!</h2>
          <p className="exito-desc">Su reserva ha sido cancelada</p>
          <div className="exito-botones">
            <button className="btn-outline-dark" onClick={hacerOtraReserva}>
              Hacer otra reserva
            </button>
          </div>
        </div>
      </LayoutReserva>
    );
  }

  // Vista éxito
  return (
    <LayoutReserva>
      <div className="exito-wrapper">

        <div className="exito-icono">✓</div>

        <h2 className="exito-titulo">¡Reserva Solicitada!</h2>

        <p className="exito-desc">
          Hemos recibido tu solicitud para{" "}
          <strong>{reserva.personas} personas</strong> el{" "}
          <strong>{reserva.fecha}</strong> a las{" "}
          <strong>{reserva.hora}</strong>.
        </p>

        <div className="exito-botones">
          <button className="btn-outline-dark" onClick={hacerOtraReserva}>
            Hacer otra reserva
          </button>
          <button className="btn-danger" onClick={() => setCancelada(true)}>
            Cancelar reserva
          </button>
        </div>

      </div>
    </LayoutReserva>
  );
}
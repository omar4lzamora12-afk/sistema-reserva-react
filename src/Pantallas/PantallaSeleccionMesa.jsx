import { useState, useEffect } from "react";
import { useReserva }    from "../Context/ReservaContext";
import { LayoutReserva } from "../Components/LayoutReserva";
import { TarjetaMesa }   from "../Components/TarjetaMesa";
import { CompModal }     from "../Components/CompModal";

export function PantallaSeleccionMesa({ onNext, onBack }) {
  const { reserva, actualizarReserva } = useReserva();

  const [mesas,        setMesas]        = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState(null); 
  const [mesaTemp,     setMesaTemp]     = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // GET de mesas 
  const cargarMesas = () => {
    setLoading(true);
    setError(null);

    // Mesas ocupadas = las que ya tienen reserva confirmada
    const mesasOcupadas = (Array.isArray(reserva) ? reserva : [])
      .filter(r => r.estado === "confirmado" && r.mesa !== null)
      .map(r => r.mesa);

    // Todas las mesas parten libres — solo ocupadas las confirmadas del Context
    const mesasMock = Array.from({ length: 15 }, (_, i) => ({
      id:      i + 1,
      ocupada: mesasOcupadas.includes(i + 1),
    }));

    // Simula el delay de red (500ms) para que se vea el "Cargando mesas..."
    setTimeout(() => {
      setMesas(mesasMock);
      setLoading(false);
    }, 500);
};

  useEffect(() => { cargarMesas(); }, []);

  function seleccionarMesa(mesa) {
    if (mesa.ocupada) return;
    setMesaTemp(mesa);
    setMostrarModal(true);
  }

  function confirmarMesa() {
    actualizarReserva({ mesa: mesaTemp });  // al Context 
    setMostrarModal(false);
    onNext();
  }

  return (
    <LayoutReserva showBack onBack={onBack}>
      <h1>L'Aura</h1>
      <p className="mesa-fecha">📅 Fecha: &nbsp;<strong>{reserva.fecha}</strong></p>
      <p className="mesa-hora">🕐 Hora: &nbsp;<strong>{reserva.hora}</strong></p>
      <p className="mesa-titulo">Elige tu plaza</p>

      {/* Estado cargando */}
      {loading && <p>Cargando mesas...</p>}
      {error   && <p className="error">{error}</p>}


      {!loading && !error && (
        <>
        <div className="leyenda">
          <span>🎀 Ocupado</span>
          <span>□ Libre</span>
        </div>
        <div className="grid-mesas">
          {mesas.map((mesa, i) => (
            <TarjetaMesa key={i} mesa={mesa}
              seleccionada={reserva.mesa?.id === mesa.id}
              onClick={() => seleccionarMesa(mesa)} />
          ))}
        </div>
        </>
      )}

      {/* CompModal reutilizable */}
      {mostrarModal && (
        <CompModal
          title="Excelente Plaza"
          content={
            <p>Ha seleccionado la plaza número <strong>{mesaTemp?.id}</strong></p>
          }
          onClose={() => setMostrarModal(false)}
        />
      )}

      <button
        className="btn-confirmar-plaza"
        disabled={!mesaTemp}
        onClick={() => {
          actualizarReserva({ mesa: mesaTemp });
          onNext();
        }}
      >
        CONFIRMAR PLAZA
      </button>
    </LayoutReserva>
  );
}
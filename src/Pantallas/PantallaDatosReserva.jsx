import { useState }      from "react";
import { useReserva }    from "../Context/ReservaContext";
import { LayoutReserva } from "../Components/LayoutReserva";
import { CompModal }     from "../Components/CompModal";

export function PantallaDatosReserva({ onNext, onBack }) {
  const { reserva, actualizarReserva } = useReserva();

  const [cliente,            setCliente]           = useState(
    { nombre: "", telefono: "", correo: "", dni: "" }
  );
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [loading,             setLoading]            = useState(false);
  const [error,               setError]              = useState(null);

  // POST — patrón fetch + async/await
  const enviarReserva = () => {
    setLoading(true);
    setMostrarConfirmacion(false);

    // Simula el delay de envío (800ms)
    setTimeout(() => {
      actualizarReserva({ cliente }); // guarda en Context 
      setLoading(false);
      onNext(); // avanza a PantallaExito
    }, 800);
  };

  const CAMPOS = [
    { label: "Nombre completo",    campo: "nombre",   type: "text"  },
    { label: "Teléfono / Whatsapp", campo: "telefono", type: "tel"   },
    { label: "Ingrese correo",      campo: "correo",   type: "email" },
    { label: "Ingrese DNI",         campo: "dni",      type: "text"  },
  ];

  return (
    <LayoutReserva showBack onBack={onBack}>
      <h1>Datos de Reserva</h1>

      {CAMPOS.map(({ label, campo, type }) => (        // props dinámicas
        <div key={campo}>
          <label>{label}</label>
          <input type={type} value={cliente[campo]}
            onChange={e => setCliente(p => ({...p, [campo]: e.target.value}))} />
        </div>
      ))}

      {error && <p className="error">{error}</p>}

      <button
        className="btn-enviar-datos"
        disabled={!cliente.nombre || !cliente.telefono ||
            !cliente.correo || !cliente.dni || loading}
        onClick={() => setMostrarConfirmacion(true)}
      >
        {loading ? "Enviando..." : "Enviar Datos Para Reserva"}
      </button>

      {/* CompModal de confirmación */}
      {mostrarConfirmacion && (
        <CompModal
          title="¿Tus datos son correctos?"
          content={
             <div className="modal-botones-fila">
              <button className="btn-modal-si"
                onClick={enviarReserva}
              >
                Sí, Reservar
              </button>
              <button className="btn-modal-no"
                onClick={() => setMostrarConfirmacion(false)}
              >
                No, editar datos
              </button>
            </div>
          }
          onClose={() => setMostrarConfirmacion(false)}
        />
      )}
    </LayoutReserva>
  );
}
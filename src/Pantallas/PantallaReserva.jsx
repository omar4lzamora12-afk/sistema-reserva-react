import { useState } from "react";
import { useReserva } from "../Context/ReservaContext";
import { LayoutReserva } from "../Components/LayoutReserva";
import { BotónHora } from "../Components/BotónHora";
import adminIcon from "../admin-icon.png";

const HORAS = ["13:00","14:00","15:00","16:30","17:00","18:30",
               "19:00","20:30","21:00","22:00","22:40","23:25"];

const CODIGO_ADMIN = "241205";

export function PantallaReserva({ onNext, onAdmin }) {
  const { reserva, actualizarReserva } = useReserva();

  // Estados del modal admin
  const [mostrarModalAdmin, setMostrarModalAdmin] = useState(false);
  const [codigoIngresado,   setCodigoIngresado]   = useState("");
  const [errorCodigo,       setErrorCodigo]       = useState(false);

  function verificarCodigo() {
    if (codigoIngresado === CODIGO_ADMIN) {
      setMostrarModalAdmin(false);
      setCodigoIngresado("");
      setErrorCodigo(false);
      onAdmin();            // navega al panel admin
    } else {
      setErrorCodigo(true);
      setCodigoIngresado("");
    }
  }

  return (
    <LayoutReserva>

      {/* ── Ícono admin esquina superior derecha ── */}
      <img
        src={adminIcon}
        alt="admin"
        className="admin-icono-btn"
        onClick={() => {
          setMostrarModalAdmin(true);
          setErrorCodigo(false);
          setCodigoIngresado("");
        }}
      />

      <h1>L'Aura</h1>
      <p className="subtitulo">Reserva tu experiencia gastronómica</p>

      {/* Fecha */}
      <label>📅 Fecha</label>
      <input
        value={reserva.fecha}
        onChange={e => actualizarReserva({ fecha: e.target.value })}
        placeholder="Sábado, 28 de Febrero"
      />

      {/* Personas */}
      <label>👤 Personas</label>
      <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
        {[1,2,3,4,5,6].map(n => (
          <button key={n}
            className={reserva.personas === n ? "btn-persona activo" : "btn-persona"}
            onClick={() => actualizarReserva({ personas: n })}>
            {n}
          </button>
        ))}
      </div>

      {/* Hora */}
      <label>🕐 Hora</label>
      <div className="grid-horas">
        {HORAS.map(h => (
          <BotónHora key={h} hora={h}
            seleccionada={reserva.hora === h}
            onClick={() => actualizarReserva({ hora: h })} />
        ))}
      </div>

      {/* Nombre */}
      <label>Nombre de la Reserva</label>
      <input
        value={reserva.nombreReserva}
        onChange={e => actualizarReserva({ nombreReserva: e.target.value })}
        placeholder="Ej. Gabriel Alzamora"
      />

      <button
        className="btn-gold"
        onClick={onNext}
        disabled={!reserva.hora || !reserva.nombreReserva}
      >
        CONFIRMAR RESERVA
      </button>

      {/* ── Modal código admin ── */}
      {mostrarModalAdmin && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h4 className="modal-title">Acceso Administrador</h4>
                <button className="btn-close"
                  onClick={() => setMostrarModalAdmin(false)}>✕</button>
              </div>

              <div className="modal-body">
                <p className="admin-modal-desc">
                  Ingresa el código de 6 dígitos
                </p>
                <input
                  className="admin-input-codigo"
                  type="password"
                  maxLength={6}
                  placeholder="● ● ● ● ● ●"
                  value={codigoIngresado}
                  onChange={e => {
                    setCodigoIngresado(e.target.value);
                    setErrorCodigo(false);
                  }}
                  onKeyDown={e => e.key === "Enter" && verificarCodigo()}
                />
                {errorCodigo && (
                  <p className="admin-error">Código incorrecto, intenta de nuevo</p>
                )}
              </div>

              <div className="modal-footer" style={{ display: "flex", gap: "10px" }}>
                <button className="btn-modal-no"
                  style={{ flex: 1 }}
                  onClick={() => setMostrarModalAdmin(false)}>
                  Cancelar
                </button>
                <button className="btn-modal-si"
                  style={{ flex: 1 }}
                  onClick={verificarCodigo}
                  disabled={codigoIngresado.length !== 6}>
                  Ingresar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </LayoutReserva>
  );
}
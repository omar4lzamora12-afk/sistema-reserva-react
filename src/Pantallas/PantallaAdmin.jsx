import { useState } from "react";
import { LayoutReserva } from "../Components/LayoutReserva";
import { useReserva } from "../Context/ReservaContext";


// ── Calendario simple ──
function CalendarioMes() {
  const [mes, setMes]   = useState(1);   // 0=ene, 1=feb
  const [anio]          = useState(2026);
  const [diaSelec, setDiaSelec] = useState(26);

  const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                 "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const DIAS  = ["D","L","M","W","J","V","S"];

  const primerDia  = new Date(anio, mes, 1).getDay();
  const totalDias  = new Date(anio, mes + 1, 0).getDate();
  const celdas     = Array(primerDia).fill(null)
                       .concat(Array.from({ length: totalDias }, (_, i) => i + 1));

  return (
    <div className="cal-wrapper">
      <p className="cal-label">Selecciona Fecha</p>
      <div className="cal-fecha-grande">
        {DIAS[new Date(anio, mes, diaSelec).getDay()]},{" "}
        {MESES[mes]} {diaSelec} ✏
      </div>
      <div className="cal-nav">
        <select className="cal-mes-sel"
          value={mes} onChange={e => setMes(Number(e.target.value))}>
          {MESES.map((m, i) => <option key={i} value={i}>{m} {anio}</option>)}
        </select>
        <button className="cal-nav-btn" onClick={() => setMes(m => Math.max(0,  m - 1))}>‹</button>
        <button className="cal-nav-btn" onClick={() => setMes(m => Math.min(11, m + 1))}>›</button>
      </div>
      <div className="cal-grid-dias">
        {DIAS.map(d => <div key={d} className="cal-dia-label">{d}</div>)}
        {celdas.map((d, i) => (
          <div key={i}
            className={`cal-celda ${d === diaSelec ? "activo" : ""} ${!d ? "vacia" : ""}`}
            onClick={() => d && setDiaSelec(d)}>
            {d}
          </div>
        ))}
      </div>
      <div className="cal-footer">
        <button className="cal-footer-btn" onClick={() => setDiaSelec(null)}>Limpiar</button>
        <div style={{ display: "flex", gap: "16px" }}>
          <button className="cal-footer-btn">Cancelar</button>
          <button className="cal-footer-btn azul">OK</button>
        </div>
      </div>
    </div>
  );
}

// ── Vista de contacto del cliente ──
function VistaContacto({ reserva, onBack }) {
  return (
    <LayoutReserva showBack onBack={onBack}>
      <h1 style={{ fontStyle: "italic", textAlign: "center", marginBottom: "4px" }}>
        Datos del Cliente
      </h1>

      <div className="contacto-campo">
        <label>Nombre completo</label>
        <input readOnly value={reserva.nombre} placeholder="Gabriel Alzamora" />
      </div>
      <div className="contacto-campo">
        <label>Teléfono / Whatsapp</label>
        <input readOnly value={reserva.telefono} placeholder="+51 985 524 596" />
      </div>
      <div className="contacto-campo">
        <label>Ingrese correo</label>
        <input readOnly value={reserva.correo} placeholder="correo@ejemplo.com" />
      </div>
      <div className="contacto-campo">
        <label>Ingrese DNI</label>
        <input readOnly value={reserva.dni} placeholder="00000000" />
      </div>

      <button className="btn-enviar-datos" style={{ marginTop: "28px" }}>
        Contactar
      </button>
    </LayoutReserva>
  );
}

// ── Componente principal ──
export function PantallaAdmin({ onBack }) {
  const { reservas, setReservas } = useReserva();
  const listaReservas = Array.isArray(reservas) ? reservas : []; // Asegura que sea un array
  const [vista,       setVista]       = useState("lista");   // lista | calendario | mesas
  const [menuAbierto, setMenuAbierto] = useState(null);      // id de la reserva con menú abierto
  const [clienteVer,  setClienteVer]  = useState(null);      // reserva a ver contacto

  const total        = reservas.length;
  const pendientes   = reservas.filter(r => r.estado === "pendiente").length;
  const confirmadas  = reservas.filter(r => r.estado === "confirmado").length;

  function confirmarReserva(id) {
    setReservas(listaReservas.map(r =>
      r.id === id ? { ...r, estado: "confirmado", mesa: r.mesa || 1 } : r
    ));
    setMenuAbierto(null);
  }

  function cancelarReserva(id) {
    setReservas(listaReservas.filter(r => r.id !== id));
    setMenuAbierto(null);
  }

  function toggleMenu(id) {
    setMenuAbierto(prev => prev === id ? null : id);
  }

  // Si está viendo contacto de un cliente
  if (clienteVer) {
    return <VistaContacto reserva={clienteVer} onBack={() => setClienteVer(null)} />;
  }

  return (
    <LayoutReserva showBack onBack={onBack}>

      {/* ── Header ── */}
      <h1 style={{ fontStyle: "italic", marginBottom: "2px" }}>Panel L'Aura</h1>
      <p className="admin-fecha-hoy">Sábado, 28 de Febrero</p>

      {/* ── Tarjetas resumen ── */}
      <div className="admin-stats">
        <div className="admin-stat-card gris">
          <span className="stat-num">{total}</span>
          <span className="stat-label">TOTAL</span>
        </div>
        <div className="admin-stat-card naranja">
          <span className="stat-num">{pendientes}</span>
          <span className="stat-label">PENDIENTES</span>
        </div>
        <div className="admin-stat-card verde">
          <span className="stat-num">{confirmadas}</span>
          <span className="stat-label">CONFIRMADAS</span>
        </div>
      </div>

      {/* ── Barra de vistas ── */}
      <div className="admin-barra">
        <span className="admin-barra-titulo">Gestión de Reservas</span>
        <div className="admin-vistas">
          <button
            className={`vista-btn ${vista === "lista"      ? "activo" : ""}`}
            onClick={() => setVista("lista")}>☰</button>
          <button
            className={`vista-btn ${vista === "calendario" ? "activo" : ""}`}
            onClick={() => setVista("calendario")}>📅</button>
          <button
            className={`vista-btn ${vista === "mesas"      ? "activo" : ""}`}
            onClick={() => setVista("mesas")}>⊞</button>
        </div>
      </div>

      {/* ── Vista: Lista ── */}
      {vista === "lista" && (
        <div className="admin-lista">
          {listaReservas.map(r => (
            <div key={r.id} className="reserva-card">
              <div className={`reserva-borde ${r.estado === "confirmado" ? "verde" : "naranja"}`} />

              <div className="reserva-info">
                {/* Nombre clickeable → ver contacto */}
                <div className="reserva-nombre-row">
                  <span
                    className="reserva-nombre"
                    onClick={() => setClienteVer(r)}
                  >
                    {r.nombre}
                  </span>
                  <button
                    className="reserva-arrow"
                    onClick={() => toggleMenu(r.id)}
                  >▶</button>
                </div>

                <div className="reserva-detalles">
                  <span>🕐 {r.hora}</span>
                  <span>👥 {r.personas} personas</span>
                </div>

                <div className="reserva-tags">
                  <span className={`tag-estado ${r.estado}`}>
                    {r.estado === "confirmado" ? "Confirmado" : "Pendiente"}
                  </span>
                  {r.mesa && (
                    <span className="tag-mesa">Mesa {r.mesa}</span>
                  )}
                </div>

                {/* Menú desplegable al click en ▶ */}
                {menuAbierto === r.id && (
                  <div className="reserva-menu">
                    {r.estado === "pendiente" && (
                      <button
                        className="menu-opcion verde"
                        onClick={() => confirmarReserva(r.id)}
                      >
                        Confirmar y Asignar mesa
                      </button>
                    )}
                    <button
                      className="menu-opcion rojo"
                      onClick={() => cancelarReserva(r.id)}
                    >
                      Cancelar reserva
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Vista: Calendario ── */}
      {vista === "calendario" && <CalendarioMes />}

      {/* ── Vista: Mesas ── */}
      {vista === "mesas" && (
        <div className="grid-mesas" style={{ marginTop: "16px" }}>
          {Array.from({ length: 15 }, (_, i) => {
            const numeroMesa = i + 1;
            const mesaOcupada = listaReservas.some(
              r => Number(r.mesa) === numeroMesa && r.estado === "confirmado"
            );
            return (
              <div key={i} className="tarjeta-mesa">
                <span className="mesa-icono">🪑</span>
                <span className="mesa-id">{numeroMesa}</span>
                <span className="mesa-estado">{mesaOcupada ? "🎀" : "□"}</span>
              </div>
            );
          })}
        </div>
      )}

    </LayoutReserva>
  );
}
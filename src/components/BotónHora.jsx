export function BotónHora({ hora, seleccionada = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn-hora ${seleccionada ? "activa" : ""}`}
    >
      {hora}
    </button>
  );
}
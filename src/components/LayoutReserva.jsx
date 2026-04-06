export function LayoutReserva({ children, showBack = false, onBack }) {
  return (
    <div className="layout-reserva">
      {showBack && (
        <button className="btn-back" onClick={onBack}>←</button>
      )}
      {children}
    </div>
  );
}
export function CompModal({ title, content, onClose }) {
  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">{content}</div>

          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onClose}>
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---- index.css (tomado de diapositiva 349) ---- */
/*
.modal-backdrop-custom {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex; justify-content: center; align-items: center;
  z-index: 1050;
}
@keyframes fadeIn {
  from { transform: scale(0.9); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
.modal-dialog {
  background: white; width: 50%;
  border-radius: 8px; animation: fadeIn 0.3s ease; padding: 20px;
}
*/
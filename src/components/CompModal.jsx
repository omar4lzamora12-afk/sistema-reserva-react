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

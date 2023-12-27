import "./ModalBase.css";
// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onCancel, onOk }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <p>¿Estás seguro de realizar esta acción?</p>
        <button className="Button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="Button" onClick={onOk}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;

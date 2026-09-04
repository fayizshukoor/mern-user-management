import "./Modal.css";

function Modal({ children, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button
                    type="button"
                    className="modal__close"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
}

export default Modal;
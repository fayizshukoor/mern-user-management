function Modal({ children, onClose }) {
    return (
        <div>
            <div>
                <button onClick={onClose}>X</button>

                {children}
            </div>
        </div>
    );
}

export default Modal;
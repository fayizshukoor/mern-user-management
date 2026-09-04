import { useState } from "react";
import { deleteUser } from "../../services/admin.service.js";
import Modal from "../common/Modal.jsx";
import "./DeleteUserModal.css";

function DeleteUserModal({ user, onUserDeleted, onCancel }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {

        try {
            setLoading(true);
            setError(null);

            await deleteUser(user._id);

            onUserDeleted(user._id);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete user"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onCancel}>
            <div className="delete-user-modal">
                <h2>Delete User</h2>

                <p>
                    Are you sure you want to delete{" "}
                    <strong>{user.name}</strong>?
                </p>

                <p className="delete-user-modal__warning">
                    This action cannot be undone.
                </p>

                {error && (
                    <p className="delete-user-modal__error">
                        {error}
                    </p>
                )}

                <div className="delete-user-modal__actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="modal-button modal-button--secondary"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="modal-button modal-button--danger"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteUserModal;
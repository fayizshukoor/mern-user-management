import { useState } from "react";
import { deleteUser } from "../../services/admin.service.js";
import Modal from "../common/Modal.jsx";

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
            <h2>Delete User</h2>

            <p>
                Are you sure you want to delete{" "}
                <strong>{user.name}</strong>?
            </p>

            {error && <p>{error}</p>}

            <button
                type="button"
                onClick={onCancel}
                disabled={loading}
            >
                Cancel
            </button>

            <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
            >
                {loading ? "Deleting..." : "Delete"}
            </button>
        </Modal>
    );
}

export default DeleteUserModal;
import { useState } from "react";
import { updateUser } from "../../services/admin.service.js";
import Modal from "../common/Modal.jsx";
import "./UserModal.css";

function EditUserModal({ user, onUserUpdated, onCancel }) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const data = await updateUser(user._id, formData);

            onUserUpdated(data.user);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update user"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onCancel}>
            <form className="user-form" onSubmit={handleSubmit}>
                <h2>Edit User</h2>

                {error && (
                    <p className="user-form__error">
                        {error}
                    </p>
                )}

                <div className="user-form__field">
                    <label htmlFor="edit-name">Name</label>

                    <input
                        id="edit-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="edit-email">Email</label>

                    <input
                        id="edit-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="edit-role">Role</label>

                    <select
                        id="edit-role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="user-form__actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="modal-button modal-button--secondary"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="modal-button"
                    >
                        {loading ? "Updating..." : "Update User"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default EditUserModal;
import { useState } from "react";
import { createUser } from "../../services/admin.service.js";
import Modal from "../common/Modal.jsx";
import "./UserModal.css"

function AddUserModal({ onUserAdded, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
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

            const data = await createUser(formData);

            onUserAdded(data.user);

            setFormData({
                name: "",
                email: "",
                password: "",
                role: "user"
            });

            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create user"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose}>
            <form className="user-form" onSubmit={handleSubmit}>
                <h2>Add User</h2>

                {error && (
                    <p className="user-form__error">
                        {error}
                    </p>
                )}

                <div className="user-form__field">
                    <label htmlFor="add-name">Name</label>

                    <input
                        id="add-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="add-email">Email</label>

                    <input
                        id="add-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="add-password">Password</label>

                    <input
                        id="add-password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <div className="user-form__field">
                    <label htmlFor="add-role">Role</label>

                    <select
                        id="add-role"
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
                        onClick={onClose}
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
                        {loading ? "Adding..." : "Add User"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default AddUserModal;
import { useState } from "react";
import { updateUser } from "../../services/admin.service.js";
import Modal from "../common/Modal.jsx";

function EditUserForm({ user, onUserUpdated, onCancel }) {
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
            <form onSubmit={handleSubmit}>
                <h2>Edit User</h2>

                {error && <p>{error}</p>}

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update User"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </form>
        </Modal>
    );
}

export default EditUserForm;
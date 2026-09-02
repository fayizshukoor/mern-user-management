import { useState } from "react";
import { createUser } from "../../services/admin.service.js";
import Modal from "../common/Modal.jsx";

function AddUserForm({ onUserAdded, onClose }) {
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
            <form onSubmit={handleSubmit}>
                <h2>Add User</h2>

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

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
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
                    {loading ? "Adding..." : "Add User"}
                </button>
            </form>
        </Modal>
    );
}

export default AddUserForm;
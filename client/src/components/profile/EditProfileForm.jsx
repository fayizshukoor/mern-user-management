import { useState } from "react";
import { updateProfile } from "../../services/user.service.js";
import Modal from '../common/Modal.jsx';

function EditProfileForm({ profile, onProfileUpdated, onCancel }) {
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email
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

            const data = await updateProfile(formData);

            onProfileUpdated(data.user);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>
    
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
    
                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                </button>
    
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>
            </form>
        </Modal>
    );
}

export default EditProfileForm;
import { useState } from "react";
import { updateProfile } from "../../services/user.service.js";
import Modal from '../common/Modal.jsx';
import "./EditProfileModal.css";

function EditProfileModal({ profile, onProfileUpdated, onCancel }) {
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
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <h2>Edit Profile</h2>

                {error && (
                    <p className="edit-profile-form__error">
                        {error}
                    </p>
                )}

                <div className="edit-profile-form__field">
                    <label htmlFor="name">Name</label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </div>

                <div className="edit-profile-form__field">
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="edit-profile-form__actions">
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
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default EditProfileModal;
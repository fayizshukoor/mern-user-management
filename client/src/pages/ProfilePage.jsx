import { useEffect, useRef, useState } from "react"
import { getProfile, removeProfileImage, uploadProfileImage } from "../services/user.service.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/auth.slice.js";
import { setAccessToken } from "../config/api.config.js";
import { logout as logoutRequest } from "../services/auth.service.js";
import EditProfileModal from "../components/profile/EditProfileModal.jsx";
import "./ProfilePage.css";

function ProfilePage() {

    const [profile, setProfile] = useState(null);
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageError, setImageError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getProfile()
            .then((data) => {
                setProfile(data);
            })
            .catch((error) => {
                console.error("Failed to load profile:", error);
            });
    }, []);

    const handleLogout = async () => {
        try {
            await logoutRequest();
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            setAccessToken(null);
            dispatch(logout());
            navigate("/login", { replace: true });
        }
    };

    const handleImageChange = async (event) => {
        const image = event.target.files[0];

        if (!image) return;

        if (!image.type.startsWith("image/")) {
            setImageError("Please select an image file");
            return;
        }

        if (image.size > 5 * 1024 * 1024) {
            setImageError("Image must be smaller than 5MB");
            return;
        }

        try {
            setImageUploading(true);
            setImageError(null);

            const data = await uploadProfileImage(image);
            setProfile(data.user);
        } catch (error) {
            setImageError(
                error.response?.data?.message ||
                "Failed to upload profile image"
            );
        } finally {
            setImageUploading(false);
        }
    };

    const fileInputRef = useRef(null);

    const handleRemoveImage = async () => {
        try {
            setImageError(null);
            const data = await removeProfileImage();
            setProfile(data.user);
        } catch (error) {
            setImageError(
                error.response?.data?.message ||
                "Failed to remove profile image"
            );
        }
    };


    return (
        <div className="profile-page">
            <h2 className="profile-page__title">Profile</h2>

            <div className="profile-card">

                {imageError && (
                    <p className="profile-error">
                        {imageError}
                    </p>
                )}

                <div className="profile-image-section">
                    {profile?.profileImage ? (
                        <img
                            className="profile-image"
                            src={profile.profileImage}
                            alt="Profile"
                        />
                    ) : (
                        <div className="profile-image-placeholder">
                            No profile image
                        </div>
                    )}

                    <div className="profile-image-actions">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            disabled={imageUploading}
                            className="profile-button"
                        >
                            {imageUploading
                                ? "Uploading..."
                                : "Change Profile Image"}
                        </button>

                        {profile?.profileImage && (
                            <button
                                onClick={handleRemoveImage}
                                disabled={imageUploading}
                                className="profile-button profile-button--secondary"
                            >
                                Remove Profile Image
                            </button>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />
                </div>

                <div className="profile-details">
                    {profile && (
                        <>
                            <div className="profile-detail">
                                <span>Name</span>
                                <strong>{profile.name}</strong>
                            </div>

                            <div className="profile-detail">
                                <span>Email</span>
                                <strong>{profile.email}</strong>
                            </div>

                            <div className="profile-detail">
                                <span>Role</span>
                                <strong>{profile.role}</strong>
                            </div>
                        </>
                    )}
                </div>

                <div className="profile-actions">
                    <button
                        onClick={() => setShowEditProfile(true)}
                        className="profile-button"
                    >
                        Edit Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="profile-button profile-button--danger"
                    >
                        Logout
                    </button>
                </div>

            </div>

            {showEditProfile && profile && (
                <EditProfileModal
                    profile={profile}
                    onProfileUpdated={(updatedProfile) => {
                        setProfile(updatedProfile);
                        setShowEditProfile(false);
                    }}
                    onCancel={() => setShowEditProfile(false)}
                />
            )}
        </div>
    );
}

export default ProfilePage;

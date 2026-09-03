import { useEffect, useRef, useState } from "react"
import { getProfile, removeProfileImage, uploadProfileImage } from "../services/user.service.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/auth.slice.js";
import { setAccessToken } from "../config/api.config.js";
import { logout as logoutRequest } from "../services/auth.service.js";
import EditProfileForm from "../components/profile/EditProfileForm.jsx";
function ProfilePage(){

    const [profile, setProfile] = useState(null);
    const [showEditProfile, setShowEditProfile] = useState(false);

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
    
        try {
            const data = await uploadProfileImage(image);
            setProfile(data.user);
        } catch (error) {
            console.error("Failed to upload profile image:", error.response?.data?.message);
        }
    };

    const fileInputRef = useRef(null);

    const handleRemoveImage = async () => {
        try {
            const data = await removeProfileImage();
            setProfile(data.user);
        } catch (error) {
            console.error(
                "Failed to remove profile image:",
                error.response?.data?.message
            );
        }
    };


    return (
        <>
            <div>
                {profile?.profileImage ? (
                    <img
                        src={profile.profileImage}
                        alt="Profile"
                        width="150"
                        height="150"
                    />
                ) : (
                    <div>
                        No profile image
                    </div>
                )}

                <button onClick={() => fileInputRef.current.click()}>
                    Change Profile Image
                </button>

                {profile?.profileImage && (
                    <button onClick={handleRemoveImage}>
                        Remove Profile Image
                    </button>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                />
            </div>
    
            <pre>{JSON.stringify(profile, null, 2)}</pre>
    
            <button onClick={() => setShowEditProfile(true)}>
                Edit Profile
            </button>
    
            {showEditProfile && profile && (
                <EditProfileForm
                    profile={profile}
                    onProfileUpdated={(updatedProfile) => {
                        setProfile(updatedProfile);
                        setShowEditProfile(false);
                    }}
                    onCancel={() => setShowEditProfile(false)}
                />
            )}
    
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default ProfilePage;
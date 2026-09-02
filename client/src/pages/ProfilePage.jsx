import { useEffect, useState } from "react"
import { getProfile } from "../services/user.service.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/auth.slice.js";
import { setAccessToken } from "../config/api.config.js";
import { logout as logoutRequest } from "../services/auth.service.js";
function ProfilePage(){

    const [profile, setProfile] = useState(null);

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


    return (
        <>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default ProfilePage;
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/auth.slice.js";
import { logout as logoutRequest } from "../../services/auth.service.js";
import { setAccessToken } from "../../config/api.config.js";
import "./Header.css";

function Header() {
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <header className="header">
            <div className="header__logo">
                User Management
            </div>

            <nav className="header__nav">
            <NavLink
                to="/profile"
                className={({ isActive }) => isActive ? "active" : ""}
            >
                Profile
            </NavLink>

            {user?.role === "admin" && (
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    Admin Users
                </NavLink>
            )}

                <button onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </header>
    );
}

export default Header;
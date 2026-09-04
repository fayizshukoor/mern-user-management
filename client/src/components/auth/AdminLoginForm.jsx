import { useEffect, useState } from "react";
import { adminLoginUser, clearError } from "../../features/auth/auth.slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function AdminLoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    
            await dispatch(adminLoginUser(formData)).unwrap();
    
            navigate("/admin/users");
        } catch (err) {
            setError(err || "Admin login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    return (
        <div className="auth-page">
            <div className="auth-card">
    
                <div className="auth-header">
                    <h1>User Management</h1>
                    <h2>Admin Login</h2>
                    <p>Sign in to manage users</p>
                </div>
    
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}
    
                    <div className="auth-field">
                        <label htmlFor="admin-email">
                            Email
                        </label>
    
                        <input
                            id="admin-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter admin email"
                            required
                        />
                    </div>
    
                    <div className="auth-field">
                        <label htmlFor="admin-password">
                            Password
                        </label>
    
                        <input
                            id="admin-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
    
                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Admin Login"}
                    </button>
                </form>
    
                <div className="auth-footer">
                    <span>Not an admin?</span>
    
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="auth-link"
                    >
                        User Login
                    </button>
                </div>
    
            </div>
        </div>
    );
}

export default AdminLoginForm;
import { useState } from "react";
import { adminLoginUser } from "../../features/auth/auth.slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    return (
        <form onSubmit={handleSubmit}>
            <h1>Admin Login</h1>

            {error && <p>{error}</p>}

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Admin email"
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

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Admin Login"}
            </button>
        </form>
    );
}

export default AdminLoginForm;
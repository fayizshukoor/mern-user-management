import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from "../../features/auth/auth.slice.js";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LoginForm(){

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value
        }))
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            await dispatch(loginUser(formData)).unwrap();
            navigate("/profile");
        } catch (error) {
            // Redux already stores the error
            console.error(error);
        }
    }

    const {error, loading} = useSelector((state)=> state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>User Management</h1>
                    <h2>Welcome Back</h2>
                    <p>Login to your account</p>
                </div>
    
                <form className="auth-form" onSubmit={handleSubmit}>
    
                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}
    
                    <div className="auth-field">
                        <label htmlFor="login-email">
                            Email
                        </label>
    
                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
    
                    <div className="auth-field">
                        <label htmlFor="login-password">
                            Password
                        </label>
    
                        <input
                            id="login-password"
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
                        {loading ? "Logging in..." : "Login"}
                    </button>
    
                </form>
    
                <div className="auth-footer">
                    <span>Don't have an account?</span>
    
                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="auth-link"
                    >
                        Register
                    </button>
                </div>
    
                <div className="auth-admin-link">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/login")}
                        className="auth-link"
                    >
                        Admin Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
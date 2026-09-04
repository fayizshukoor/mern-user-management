import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../features/auth/auth.slice.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

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
            await dispatch(registerUser(formData)).unwrap();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const { loading, error } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1>User Management</h1>
                    <h2>Create Account</h2>
                    <p>Register a new account</p>
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
                        <label htmlFor="register-name">
                            Name
                        </label>

                        <input
                            id="register-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-email">
                            Email
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-password">
                            Password
                        </label>

                        <input
                            id="register-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Registering..."
                            : "Register"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Already have an account?</span>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="auth-link"
                    >
                        Login
                    </button>
                </div>

            </div>
        </div>
    );
}

export default RegisterForm;
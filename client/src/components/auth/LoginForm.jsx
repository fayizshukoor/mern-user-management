import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../features/auth/auth.slice.js";
import { useNavigate } from "react-router-dom";

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
    return (
        <>
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}

        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
        />

        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
        />

        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
    </form>
    </>
    )
}

export default LoginForm;
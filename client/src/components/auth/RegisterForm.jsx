import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/auth.slice.js';
import { useState } from 'react';

function RegisterForm(){

    const [formData , setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (event) =>{
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    }

    const dispatch = useDispatch();

    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch(registerUser(formData));
    }

    const {loading, error} = useSelector((state)=> state.auth);


    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />

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

            <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        </>
    )
}

export default RegisterForm;
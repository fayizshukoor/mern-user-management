import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "../../features/auth/auth.slice.js";

function AuthInitializer({ children }) {
    const dispatch = useDispatch();

    const authInitialized = useSelector(
        (state) => state.auth.authInitialized
    );

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    if (!authInitialized) {
        return <p>Checking authentication...</p>;
    }

    return children;
}

export default AuthInitializer;
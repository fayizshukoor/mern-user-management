import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
    const { isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "admin") {
        return <Navigate to="/profile" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
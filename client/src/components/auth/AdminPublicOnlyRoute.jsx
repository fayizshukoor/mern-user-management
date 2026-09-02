import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminPublicOnlyRoute() {
    const { isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    if (isAuthenticated && user?.role === "admin") {
        return <Navigate to="/admin/users" replace />;
    }

    return <Outlet />;
}

export default AdminPublicOnlyRoute;
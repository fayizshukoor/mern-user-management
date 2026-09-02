import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import PublicOnlyRoute from "../components/auth/PublicOnlyRoute.jsx";
import AdminRoute from "../components/auth/AdminRoute.jsx";
import AdminUsersPage from "../pages/AdminUsersPage.jsx";
import AdminLoginPage from "../pages/AdminLoginPage.jsx";
import AdminPublicOnlyRoute from "../components/auth/AdminPublicOnlyRoute.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Navigate to={'/login'} replace />
    },
    {
        element: <PublicOnlyRoute />,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            }
        ]
    },
    {
        element: <AdminPublicOnlyRoute />,
        children: [
            {
                path: "/admin/login",
                element: <AdminLoginPage />
            }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/profile",
                element: <ProfilePage />
            }
        ]
    },
    {
        element: <AdminRoute />,
        children: [
            {
                path: '/admin/users',
                element: <AdminUsersPage />
            }
        ]
    }
]);

export default router;
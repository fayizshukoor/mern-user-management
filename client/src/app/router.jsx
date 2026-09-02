import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import PublicOnlyRoute from "../components/auth/PublicOnlyRoute.jsx";

const router = createBrowserRouter([
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
        element: <ProtectedRoute />,
        children: [
            {
                path: "/profile",
                element: <ProfilePage />
            }
        ]
    }
]);

export default router;
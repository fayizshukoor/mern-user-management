import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

function AppLayout() {
    return (
        <div>
            <Header />
            
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;
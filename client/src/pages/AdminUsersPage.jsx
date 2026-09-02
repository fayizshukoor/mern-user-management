import { useEffect, useState } from "react";
import { getUsers } from "../services/admin.service.js";
import UserList from "../components/users/UserList.jsx";

function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError("Failed to load users");
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
    
        try {
            setLoading(true);
            setError(null);
    
            const data = await getUsers(search);
            setUsers(data);
        } catch (err) {
            setError("Failed to search users");
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h1>Admin Users</h1>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name or email"
                />

                <button type="submit">
                    Search
                </button>
            </form>

            <UserList users={users}/>
        </>
    );
}

export default AdminUsersPage;
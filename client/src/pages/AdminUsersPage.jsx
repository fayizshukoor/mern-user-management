import { useEffect, useState } from "react";
import { getUsers } from "../services/admin.service.js";
import UserList from "../components/users/UserList.jsx";
import AddUserForm from "../components/users/AddUserForm.jsx";
import EditUserForm from "../components/users/EditUserForm.jsx";
import DeleteUserModal from "../components/users/DeleteUserModal.jsx";

function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [showAddUser, setShowAddUser] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);
    

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

    const handleUserAdded = (newUser) => {
        setUsers((previousUsers) => [
            ...previousUsers,
            newUser
        ]);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUserUpdated = (updatedUser) => {
        setUsers((previousUsers) =>
            previousUsers.map((user) =>
                user._id === updatedUser._id
                    ? updatedUser
                    : user
            )
        );
    
        setEditingUser(null);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleDelete = (user) => {
        setDeletingUser(user);
    };

    const handleUserDeleted = (userId) => {
        setUsers((previousUsers) =>
            previousUsers.filter((user) => user._id !== userId)
        );
    
        setDeletingUser(null);
    };

    const handleCancelDelete = () => {
        setDeletingUser(null);
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

            <button onClick={() => setShowAddUser(true)}>
                Add User
            </button>

            {showAddUser && (
                <AddUserForm
                    onUserAdded={handleUserAdded}
                    onClose={() => setShowAddUser(false)}
                />
            )}

            {editingUser && (
                <EditUserForm
                    user={editingUser}
                    onUserUpdated={handleUserUpdated}
                    onCancel={handleCancelEdit}
                />
            )}

            {deletingUser && (
                <DeleteUserModal
                    user={deletingUser}
                    onUserDeleted={handleUserDeleted}
                    onCancel={handleCancelDelete}
                />
            )}

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

            <UserList 
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
                />
        </>
    );
}

export default AdminUsersPage;
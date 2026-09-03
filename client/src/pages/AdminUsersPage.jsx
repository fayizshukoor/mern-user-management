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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showAddUser, setShowAddUser] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [deletingUser, setDeletingUser] = useState(null);

    const [refreshUsers, setRefreshUsers] = useState(0);
    

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);
    
                const data = await getUsers(search, currentPage, 10);
    
                setUsers(data.users);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError("Failed to load users");
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        }, 500);
    
        return () => {
            clearTimeout(timer);
        };
    }, [search, currentPage, refreshUsers]);


    const handleUserAdded = () => {
    setRefreshUsers((value) => value + 1);
};

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUserUpdated = () => {
        setEditingUser(null);
        setRefreshUsers((value) => value + 1);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleDelete = (user) => {
        setDeletingUser(user);
    };

    const handleUserDeleted = () => {
    setDeletingUser(null);
    setRefreshUsers((value) => value + 1);
};

    const handleCancelDelete = () => {
        setDeletingUser(null);
    };


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
    
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search by name or email"
                />
    
                {search && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setCurrentPage(1);
                        }}
                    >
                        Clear
                    </button>
                )}
            </div>
        
            {loading && <p>Loading users...</p>}
    
            {!loading && error && <p>{error}</p>}
    
            {!error && (
                <UserList
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {!loading && !error && (
                <div>
                    <button
                        onClick={() => setCurrentPage((page) => page - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((page) => page + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}

export default AdminUsersPage;
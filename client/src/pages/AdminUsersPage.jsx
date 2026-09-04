import { useEffect, useState } from "react";
import { getUsers } from "../services/admin.service.js";
import UserList from "../components/users/UserList.jsx";
import AddUserModal from "../components/users/AddUserModal.jsx";
import EditUserModal from "../components/users/EditUserModal.jsx";
import DeleteUserModal from "../components/users/DeleteUserModal.jsx";
import "./AdminUsersPage.css";
import { useSelector } from "react-redux";

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

    const { user } = useSelector((state) => state.auth);

    return (
        <div className="admin-users-page">

            <div className="admin-users-header">
                <div>
                    <h1>Admin Users</h1>
                    <p>Manage users and their access.</p>
                </div>

                <button
                    className="admin-users__add-button"
                    onClick={() => setShowAddUser(true)}
                >
                    + Add User
                </button>
            </div>

            {showAddUser && (
                <AddUserModal
                    onUserAdded={handleUserAdded}
                    onClose={() => setShowAddUser(false)}
                />
            )}

            {editingUser && (
                <EditUserModal
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

            <div className="admin-users-search">
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

            {loading && (
                <p className="admin-users__status">
                    Loading users...
                </p>
            )}

            {!loading && error && (
                <p className="admin-users__error">
                    {error}
                </p>
            )}

            {!loading && !error && (
                <UserList
                    users={users}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    currentUserId={user?.id}
                />
            )}

            {!loading && !error && (
                <div className="admin-users-pagination">
                    <button
                        onClick={() =>
                            setCurrentPage((page) => page - 1)
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((page) => page + 1)
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminUsersPage;
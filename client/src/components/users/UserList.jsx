import "./UserList.css";

function UserList({ users, onEdit, onDelete, currentUserId }) {
    return (
        <div className="user-list">
            {users.map((user) => (
                <div className="user-card" key={user._id}>

                    <div className="user-card__info">
                        <div className="user-card__field">
                            <span>Name</span>
                            <strong>{user.name}</strong>
                        </div>

                        <div className="user-card__field">
                            <span>Email</span>
                            <strong>{user.email}</strong>
                        </div>

                        <div className="user-card__field">
                            <span>Role</span>
                            <span className="user-card__role">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div className="user-card__actions">
                        <button
                            onClick={() => onEdit(user)}
                            className="user-card__edit"
                        >
                            Edit
                        </button>

                        {user._id !== currentUserId && (
                            <button 
                                onClick={() => onDelete(user)}
                                className="user-card__delete"
                                >
                                Delete
                            </button>
                        )}
                    </div>

                </div>
            ))}
        </div>
    );
}

export default UserList;
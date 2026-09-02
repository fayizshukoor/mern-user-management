function UserList({ users, onEdit, onDelete }) {
    return (
        <div>
            {users.map((user) => (
                <div key={user._id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>

                    <button onClick={() => onEdit(user)}>Edit</button>
                    <button onClick={() => onDelete(user)}>Delete</button>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default UserList;
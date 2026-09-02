function UserList({ users }) {
    return (
        <div>
            {users.map((user) => (
                <div key={user._id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default UserList;
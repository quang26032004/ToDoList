export const UserList = (props) => {
  return (
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Username</th>
          <th>FullName</th>
          <th>Department</th>
          <th>Position</th>
          <th colSpan={2}>Action</th>
        </tr>
        {props.userList.map((user) => {
          return (
            <tr key={user.id} style={{ backgroundColor: user.id % 2 === 0 ? 'green' : 'inherit' }}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.department}</td>
              <td>{user.position}</td>
              <td>
                <button className="btn-edit" onClick={() => props.handleEdit(user)}>Edit</button>
              </td>
              <td>
                <button className="btn-delete" onClick={() => props.deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

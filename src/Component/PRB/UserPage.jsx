import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Page.css";
import FormRegister from "./FormRegister";

function UserPage() {
  const [userData, setUserData] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        });
        fetchData();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <table className="user-container">
      <FormRegister
        fetchData={fetchData}
        editedUser={editedUser}
        setUserData={setUserData}
        userData={userData}
      />
      <br />
      <br />
      <hr />
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Username</th>
        <th>Fullname</th>
        <th>Department</th>
        <th>Position</th>
        <th>Actions</th>
      </tr>

      {userData.map((user) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.fullName}</td>
          <td>{user.department}</td>
          <td>{user.position}</td>
          <td>
            <button className="edit-btn" onClick={() => setEditedUser(user)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default UserPage;

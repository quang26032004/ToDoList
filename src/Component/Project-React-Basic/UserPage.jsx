import React, { useEffect } from "react";
import { UserList } from "./UserList";
import { FormSection } from "./FormSection";
import { useState } from "react";
import "./UserPage.css";

const UserPage = () => {
  const [userList, setUserList] = useState([]);
  const [editedUser, setEditedUser] = useState(null);

  const fetchUsers = async () => {
    const data = await fetch("http://localhost:3000/users");
    const userList = await data.json();
    setUserList(userList);
  };

  const createUser = async (user) => {
    console.log("createUser", user);
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, id: userList.length + 1 }),
    });
    if (response.ok) {
      if (response.ok) {
        await fetchUsers();
      } else {
        console.error("Failed to create user");
      }
    }
  };

  const deleteUser = async (id) => {
    console.log("deleteUser", id);
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });
      await fetchUsers();
      window.location.reload();
    }
  };

  const updateUser = async (user) => {
    console.log("updateUser", user);
    await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    });
    setEditedUser(null);
    await fetchUsers();
  };

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  useEffect(() => {
    fetchUsers();
    return () => fetchUsers();
  }, []);

  return (
    <div className="user-page">
      <h1>User Page</h1>
      <FormSection
        createUser={createUser}
        updateUser={updateUser}
        editedUser={editedUser}
      />
      <UserList
        userList={userList}
        handleEdit={handleEdit}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default UserPage;

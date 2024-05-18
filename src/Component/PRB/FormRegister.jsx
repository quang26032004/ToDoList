import React, { useEffect, useState } from "react";
import "./Form.css";

const FormRegister = (props) => {
  const [newUser, setNewUser] = useState({
    email: "",
    username: "",
    fullName: "",
    department: "",
    position: "",
  });

  useEffect(() => {
    setNewUser(props.editedUser);
  }, [props.editedUser]);

  const handleEdit = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );
    if (confirmed) {
      await fetch(`http://localhost:3000/users/${props?.editedUser?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser }),
      });
      props?.fetchData();
      window.location.reload();
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (
      !newUser?.email?.trim().length  ||
      !newUser?.username?.trim().length  ||
      !newUser?.fullName?.trim().length  ||
      !newUser?.department?.trim().length  ||
      !newUser?.position?.trim().length 
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      const confirmed = window.confirm("Bạn có chắc chắn muốn thêm người dùng này không?");
      if (confirmed) {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (response.ok) {
          props?.fetchData();
          window.location.reload();
        } else {
          alert("Có lỗi xảy ra khi thêm người dùng mới");
        }
      }
    }
  };
  

  return (
    <div className="register-form">
      <input
        required
        onChange={handleChange}
        value={newUser?.email}
        name="email"
        className="register-input"
        placeholder="Enter your email"
      />
      <input
        required
        onChange={handleChange}
        value={newUser?.username}
        name="username"
        className="register-input"
        placeholder="Enter your username"
      />
      <input
      required
        onChange={handleChange}
        value={newUser?.fullName}
        name="fullName"
        className="register-input"
        placeholder="Enter your full name"
      />
      <input
      required
        onChange={handleChange}
        value={newUser?.department}
        name="department"
        className="register-input"
        placeholder="Enter your department"
      />
      <input
      required
        onChange={handleChange}
        value={newUser?.position}
        name="position"
        className="register-input"
        placeholder="Enter your position"
      />
      <button
        onClick={!!props.editedUser ? handleEdit : handleAddUser}
        className="register-btn"
      >
        {props.editedUser ? "Edit User" : "Create new user"}
      </button>
    </div>
  );
};

export default FormRegister;

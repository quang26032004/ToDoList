import { useEffect, useState } from "react";

export const FormSection = (props) => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    username: "",
    fullName: "",
    department: "",
    position: "",
  });
  console.log("FormSection", user);

  useEffect(() => {
    if (!!props.editedUser) setUser(props.editedUser);
  }, [props.editedUser]);

  return (
    <div className="form-section">
      <div className="form-section-item">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="form-section-item">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>

      <div className="form-section-item">
        <label htmlFor="fullName">Fullname</label>
        <input
          type="text"
          id="fullName"
          placeholder="Fullname"
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        />
      </div>

      <div className="form-section-item">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={user.department}
          onChange={(e) => setUser({ ...user, department: e.target.value })}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
          <option value="Sales">Sales</option>
          <option value="Research and Development">
            Research and Development
          </option>
          <option value="Customer Service">Customer Service</option>
          <option value="Quality Assurance">Quality Assurance</option>
          <option value="Product Management">Product Management</option>
        </select>
      </div>

      <div className="form-section-item">
        <label htmlFor="position">Position</label>
        <select
          id="position"
          value={user.position}
          onChange={(e) => setUser({ ...user, position: e.target.value })}
        >
          <option value="">Select Position</option>
          <option value="Intern">Intern</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="Vice President">Vice President</option>
        </select>
      </div>

      <div className="form-btn-item">
        <button
            className="btn-setUser"
          onClick={() => {
            if (props.editedUser) {
              props.updateUser(user);
            } else {
              props.createUser(user);
            }
            setUser({
              id: "",
              email: "",
              username: "",
              fullname: "",
              department: "",
              position: "",
            });
          }}
        >
          {props.editedUser ? "Update user" : "Create user"}
        </button>
        <button className="btn-reset">Reset Form</button>
      </div>
    </div>
  );
};

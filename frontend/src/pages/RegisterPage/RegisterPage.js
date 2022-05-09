import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = { name: "", email: "", password: "", isAdmin: false };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser,
    handleUserInfo
  );

  async function handleUserInfo() {
    try {
      let newUser = {};
      await axios
        .post("http://localhost:3011/api/users/register")
        .then((res) => {
          newUser = res.data;
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            width: "20%",
          }}
        >
          Admin:{" "}
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;

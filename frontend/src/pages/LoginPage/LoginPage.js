import axios from "axios";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const { loginUser, isServerError } = useContext(AuthContext);
    const defaultValues = { email: "", password: "" };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        defaultValues,
        loginUser,
        handleUserLogin
    );

    useEffect(() => {
        if (isServerError) {
            reset();
        }
    }, [isServerError]);

    async function handleUserLogin() {
        try {
            const jwt = localStorage.getItem('token');
            const response = await axios
                .post("http://localhost:3011/api/users/login", { headers: { Authorization: 'Bearer ' + jwt } });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
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
                {isServerError ? (
                    <p className="error">Login failed, incorrect credentials!</p>
                ) : null}
                <Link to="/register">Click to register!</Link>
                <button>Login!</button>
            </form>
        </div>
    );
};

export default LoginPage;

import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(formData.email, formData.password);
            if (data) {
                loginUser(data.user);
                if (data.user.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                setMessage("Email hoặc mật khẩu không đúng!");
            }
        } catch (error) {
            setMessage("Lỗi đăng nhập!");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Đăng Nhập</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Đăng Nhập</button>
                <p className="message">{message}</p>
            </form>
        </div>
    );
};

export default Login;

import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { login, register } from "../api/authService";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const data = await login(formData.email, formData.password);

                if (!data || !data.user) {
                    setMessage("Email hoặc mật khẩu không đúng!");
                    return;
                }

                loginUser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                await register(formData);
                setMessage("Đăng ký thành công! Hãy đăng nhập.");
                setIsLogin(true);
            }
        } catch (error) {
            console.error("Lỗi API:", error);
            setMessage("Có lỗi xảy ra! Vui lòng thử lại.");
        }
    };

    return (
        <div
            className={`container-login ${
                !isLogin ? "right-panel-active" : ""
            }`}
        >
            <div className="form-container sign-in-container">
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

            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit}>
                    <h1>Đăng Ký</h1>
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên"
                        onChange={handleChange}
                        required
                    />
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
                    <button type="submit">Đăng Ký</button>
                    <p className="message">{message}</p>
                </form>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Chào Mừng Trở Lại!</h1>
                        <p>Để tiếp tục, hãy đăng nhập</p>
                        <button
                            className="ghost"
                            onClick={() => setIsLogin(true)}
                        >
                            Đăng Nhập
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Xin Chào!</h1>
                        <p>Tạo tài khoản ngay!</p>
                        <button
                            className="ghost"
                            onClick={() => setIsLogin(false)}
                        >
                            Đăng Ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

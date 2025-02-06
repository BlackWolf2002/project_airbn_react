import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Đường dẫn đúng
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
                if (data) {
                    loginUser(data.user);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));

                    if (data.user.role === "ADMIN") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                } else {
                    setMessage("Email hoặc mật khẩu không đúng!");
                }
            } else {
                await register(formData);
                setMessage("Đăng ký thành công! Hãy đăng nhập.");
                setIsLogin(true);
            }
        } catch (error) {
            setMessage(error.message || "Có lỗi xảy ra!");
        }
    };

    return (
        <div className="container-login">
            <div
                className={`form-container ${
                    isLogin ? "sign-in-container" : "sign-up-container"
                }`}
            >
                <form onSubmit={handleSubmit}>
                    <h1>{isLogin ? "Đăng Nhập" : "Đăng Ký"}</h1>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Tên"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Số điện thoại"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="date"
                                name="birthday"
                                onChange={handleChange}
                                required
                            />
                            <select name="gender" onChange={handleChange}>
                                <option value={true}>Nam</option>
                                <option value={false}>Nữ</option>
                            </select>
                        </>
                    )}
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
                    <button type="submit">
                        {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                    </button>
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

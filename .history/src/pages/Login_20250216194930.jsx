import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { login, register } from "../api/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
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
                data.user.role === "ADMIN" ? navigate("/admin") : navigate("/");
            } else {
                await register(formData);
                setMessage("Đăng ký thành công! Hãy đăng nhập.");
                setIsLogin(true);
            }
        } catch (error) {
            setMessage("Có lỗi xảy ra! Vui lòng thử lại.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên"
                            className="w-full p-3 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        className="w-full p-3 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300"
                    >
                        {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                    </button>
                    <p className="mt-3 text-red-500 text-center">{message}</p>
                </form>
                <p className="mt-4 text-center">
                    {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;

import { useState } from "react";
import { login, register } from "../api/authService";
import "../style/Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        birthday: "",
        gender: true,
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
                localStorage.setItem("token", data.token);
                setMessage("Đăng nhập thành công!");
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

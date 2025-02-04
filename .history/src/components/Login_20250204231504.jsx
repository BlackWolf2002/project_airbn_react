import React from "react";
import { useState } from "react";

export const Login = () => {
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

    return (
        <div className="container-login">
            <div
                className={`form-container ${
                    isLogin ? "sign-in-container" : "sign-up-container"
                } `}
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
                                <option value="{true}">Nam</option>
                                <option value="{false}">Nữ</option>
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
                </form>
            </div>
        </div>
    );
};

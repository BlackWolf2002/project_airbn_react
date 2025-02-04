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
            ></div>
        </div>
    );
};

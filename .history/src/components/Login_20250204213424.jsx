import React from 'react'
import { useState } from 'react'

export const Login = () => {
    const [formData,setFormData] = useState([
        email: "",
        password: "",
        name: "",
        phone: "",
        birthday: "",
        gender: true
    ])


  return (
    <div>Login</div>
  )
}

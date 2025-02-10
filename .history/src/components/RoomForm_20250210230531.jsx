import React, { useState } from "react";

export const RoomForm = ({ initialData = {}, onsubmit }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
    };
    return <div>RoomForm</div>;
};

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
    addLocation,
    updateLocation,
    uploadLocationImage,
} from "../api/locationService";

const ViTriForm = ({ location, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(location || null);

    // Reset form mỗi khi location thay đổi
    useEffect(() => {
        if (location) {
            form.setFieldsValue(location); // Gán dữ liệu vào form
            setImage(location.hinhAnh || null); // Gán ảnh nếu có
            setCurrentLocation(location); // Cập nhật trạng thái hiện tại
        } else {
            form.resetFields(); // Xóa dữ liệu cũ trên form khi thêm mới
            setImage(null);
            setCurrentLocation(null);
        }
    }, [location, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            let updatedLocation = { ...values };

            // Nếu có ảnh mới, sử dụng ảnh đó
            if (image) {
                updatedLocation.hinhAnh = image;
            } else if (location) {
                updatedLocation.hinhAnh = location.hinhAnh; // Giữ nguyên ảnh cũ nếu không thay đổi
            }

            if (location) {
                await updateLocation(location.id, updatedLocation);
            } else {
                const newLocation = await addLocation(updatedLocation);
                setCurrentLocation(newLocation.content); // Cập nhật dữ liệu mới
            }

            message.success(location ? "Cập nhật vị trí thành công!" : "Thêm vị trí thành công!");
            onClose(

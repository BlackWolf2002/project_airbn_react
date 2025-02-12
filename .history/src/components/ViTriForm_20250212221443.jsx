import React, { useState } from "react";
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

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (location) {
                await updateLocation(location.id, {
                    ...values,
                    hinhAnh: image || location.hinhAnh,
                });
            } else {
                await addLocation({ ...values, hinhAnh: image });
            }
            message.success(
                location
                    ? "Cập nhật vị trí thành công!"
                    : "Thêm vị trí thành công!"
            );
            onClose();
        } catch (error) {
            console.error("Lỗi khi lưu vị trí:", error);
            message.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async ({ file }) => {
        try {
            if (!file) {
                message.error("Vui lòng chọn file ảnh!");
                return;
            }

            console.log("📤 Đang tải lên ảnh:", file);

            const response = await uploadLocationImage(location.id, file);
            setImage(response.content); // Đảm bảo lấy URL ảnh sau khi upload thành công
            message.success("Tải ảnh lên thành công!");
        } catch (error) {
            console.error("❌ Lỗi khi tải ảnh lên:", error);
            message.error("Không thể tải ảnh lên!");
        }
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={location || {}}
        >
            <Form.Item
                name="tenViTri"
                label="Tên vị trí"
                rules={[
                    { required: true, message: "Vui lòng nhập tên vị trí!" },
                ]}
            >
                <Input placeholder="Nhập tên vị trí" />
            </Form.Item>

            <Form.Item
                name="tinhThanh"
                label="Tỉnh thành"
                rules={[
                    { required: true, message: "Vui lòng nhập tỉnh thành!" },
                ]}
            >
                <Input placeholder="Nhập tỉnh thành" />
            </Form.Item>

            <Form.Item
                name="quocGia"
                label="Quốc gia"
                rules={[{ required: true, message: "Vui lòng nhập quốc gia!" }]}
            >
                <Input placeholder="Nhập quốc gia" />
            </Form.Item>

            <Form.Item label="Hình ảnh">
                <Upload
                    customRequest={handleImageUpload}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                </Upload>
                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        style={{ marginTop: 10, width: "100%" }}
                    />
                )}
            </Form.Item>

            <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: "100%" }}
            >
                {location ? "Cập nhật" : "Thêm mới"}
            </Button>
        </Form>
    );
};

export default ViTriForm;

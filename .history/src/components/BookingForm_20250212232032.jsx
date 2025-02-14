import React, { useEffect } from "react";
import { Form, Input, Button, DatePicker, Modal } from "antd";
import moment from "moment";

const BookingForm = ({ booking, visible, onClose, onSubmit }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (booking) {
            form.setFieldsValue({
                ...booking,
                ngayDen: moment(booking.ngayDen),
                ngayDi: moment(booking.ngayDi),
            });
        } else {
            form.resetFields();
        }
    }, [booking, visible]);

    const handleSubmit = async (values) => {
        onSubmit({ ...booking, ...values });
    };

    return (
        <Modal
            title={booking ? "Chỉnh sửa Booking" : "Thêm Booking"}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="maPhong"
                    label="Mã phòng"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="maNguoiDung"
                    label="Mã người dùng"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ngayDen"
                    label="Ngày đến"
                    rules={[{ required: true }]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    name="ngayDi"
                    label="Ngày đi"
                    rules={[{ required: true }]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    name="soLuongKhach"
                    label="Số khách"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    {booking ? "Cập nhật" : "Thêm mới"}
                </Button>
            </Form>
        </Modal>
    );
};

export default BookingForm;

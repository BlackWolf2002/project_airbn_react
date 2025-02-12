import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const BookingTable = ({ bookings, onEdit, onDelete }) => {
    const columns = [
        {
            title: "Mã đặt phòng",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mã phòng",
            dataIndex: "maPhong",
            key: "maPhong",
        },
        {
            title: "Mã người dùng",
            dataIndex: "maNguoiDung",
            key: "maNguoiDung",
        },
        {
            title: "Ngày đến",
            dataIndex: "ngayDen",
            key: "ngayDen",
            render: (text) => moment(text).format("DD/MM/YYYY"),
        },
        {
            title: "Ngày đi",
            dataIndex: "ngayDi",
            key: "ngayDi",
            render: (text) => moment(text).format("DD/MM/YYYY"),
        },
        {
            title: "Số khách",
            dataIndex: "soLuongKhach",
            key: "soLuongKhach",
        },
        {
            title: "Trạng thái",
            key: "trangThai",
            render: (record) =>
                record.soLuongKhach > 0 ? (
                    <span style={{ color: "green" }}>✔️ Đã xác nhận</span>
                ) : (
                    <span style={{ color: "red" }}>❌ Hủy</span>
                ),
        },
        {
            title: "Thao tác",
            key: "actions",
            render: (record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => onDelete(record.id)}
                    />
                </>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={bookings}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default BookingTable;

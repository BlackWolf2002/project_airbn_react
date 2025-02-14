import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const BookingTable = ({ bookings, onEdit, onDelete }) => {
    const columns = [
        { title: "Mã đặt phòng", dataIndex: "id", key: "id" },
        { title: "Mã phòng", dataIndex: "maPhong", key: "maPhong" },
        {
            title: "Mã người dùng",
            dataIndex: "maNguoiDung",
            key: "maNguoiDung",
        },
        {
            title: "Ngày đến",
            dataIndex: "ngayDen",
            key: "ngayDen",
            render: (date) => moment(date).format("DD/MM/YYYY"), // Format ngày tháng
        },
        {
            title: "Ngày đi",
            dataIndex: "ngayDi",
            key: "ngayDi",
            render: (date) => moment(date).format("DD/MM/YYYY"), // Format ngày tháng
        },
        { title: "Số khách", dataIndex: "soLuongKhach", key: "soLuongKhach" },
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
                        style={{ marginLeft: 10 }}
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

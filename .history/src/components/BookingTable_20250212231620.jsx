import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
export const BookingTable = () => {
    const columns = [
        { title: "Mã đặt phòng", dataIndex: "id", key: "id" },
        { title: "Mã phòng", dataIndex: "maPhong", key: "maPhong" },
        {
            title: "Mã người dùng",
            dataIndex: "maNguoiDung",
            key: "maNguoiDung",
        },
        { title: "Ngày đến", dataIndex: "ngayDen", key: "ngayDen" },
        { title: "Ngày đi", dataIndex: "ngayDi", key: "ngayDi" },
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
                </>
            ),
        },
    ];
    return <div>BookingTable</div>;
};

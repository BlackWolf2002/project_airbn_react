import React from "react";

export const BookingTable = () => {
    const columns = [
        { title: "Mã đặt phòng", dataIndex: "id", key: "id" },
        { title: "Mã phòng", dataIndex: "maPhong", key: "maPhong" },
        {
            title: "Mã người dùng",
            dataIndex: "maNguoiDung",
            key: "maNguoiDung",
        },
        {},
    ];
    return <div>BookingTable</div>;
};

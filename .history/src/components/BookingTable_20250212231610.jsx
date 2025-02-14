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
        { title: "Ngày đến", dataIndex: "ngayDen", key: "ngayDen" },
        { title: "Ngày đi", dataIndex: "ngayDi", key: "ngayDi" },
        { title: "Số khách", dataIndex: "soLuongKhach", key: "soLuongKhach" },
        {
            title:"Thao tác",
            key:"actions",
            render: (record) =>(
                <>
                    <button icon={<EditOutLine}></button>
                </>
            )
        }
    ];
    return <div>BookingTable</div>;
};

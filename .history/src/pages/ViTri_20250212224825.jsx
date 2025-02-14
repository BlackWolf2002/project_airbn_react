import React, { useEffect, useState } from "react";
import { fetchLocations, deleteLocation } from "../api/locationService";
import { Button, Table, Input, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ViTriForm from "./ViTriForm";
import AdminNavbar from "./AdminNavbar"; // Import thanh sidebar
import "../style/Admin.css";

const ViTri = () => {
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState(null);

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        try {
            const data = await fetchLocations();
            setLocations(data.content || []);
        } catch (error) {
            console.error("Lỗi khi tải danh sách vị trí:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa vị trí này?")) {
            try {
                await deleteLocation(id);
                loadLocations();
            } catch (error) {
                console.error("Lỗi khi xóa vị trí:", error);
            }
        }
    };

    const filteredLocations = locations.filter((loc) =>
        loc.tenViTri.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            title: "Mã ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Image",
            key: "hinhAnh",
            render: (record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    {record.hinhAnh ? (
                        <img
                            src={record.hinhAnh}
                            alt={record.tenViTri}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 5,
                                marginRight: 10,
                            }}
                        />
                    ) : (
                        <span>Không có ảnh</span>
                    )}
                    {record.tenViTri}
                </div>
            ),
        },
        {
            title: "Tỉnh thành",
            dataIndex: "tinhThanh",
            key: "tinhThanh",
        },
        {
            title: "Quốc gia",
            dataIndex: "quocGia",
            key: "quocGia",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            setEditingLocation(record);
                            setIsModalOpen(true);
                        }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </>
            ),
        },
    ];

    return (
        <div className="admin-container">
            <AdminNavbar />
            <div className="admin-content">
                <h2 className="admin-title">Quản lý vị trí</h2>

                <Input
                    placeholder="Nhập từ khóa tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: 20 }}
                />

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        setEditingLocation(null);
                        setIsModalOpen(true);
                    }}
                    style={{ marginBottom: 20 }}
                >
                    Thêm vị trí mới
                </Button>

                <Table
                    columns={columns}
                    dataSource={filteredLocations}
                    rowKey="id"
                    pagination={{ pageSize: 3 }}
                />

                <Modal
                    title={
                        editingLocation ? "Chỉnh sửa vị trí" : "Thêm vị trí mới"
                    }
                    open={isModalOpen}
                    footer={null}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <ViTriForm
                        location={editingLocation}
                        onClose={() => {
                            setIsModalOpen(false);
                            loadLocations();
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default ViTri;

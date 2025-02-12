import React, { useState, useEffect } from "react";
import { fetchBookings, deleteBooking } from "../api/bookingService";
import BookingTable from "../components/BookingTable";
import BookingForm from "../components/BookingForm";
import AdminNavbar from "../components/AdminNavbar";
import { Button } from "antd";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        const data = await fetchBookings();
        setBookings(data);
    };

    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa booking này?")) {
            await deleteBooking(id);
            loadBookings();
        }
    };

    const handleSubmit = async (data) => {
        setIsModalOpen(false);
        loadBookings();
    };

    return (
        <div className="admin-container">
            <AdminNavbar />
            <div className="admin-content">
                <h2>Quản lý Booking</h2>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Thêm Booking
                </Button>
                <BookingTable
                    bookings={bookings}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <BookingForm
                    booking={editingBooking}
                    visible={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default BookingManagement;

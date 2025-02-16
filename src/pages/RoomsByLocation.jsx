import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRoomsByLocation } from '../api/roomService';
import RoomCard from '../components/RoomCard'; // Import RoomCard
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const RoomsByLocation = () => {
    const { id } = useParams();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRooms = async () => {
            try {
                console.log(`📌 Fetching rooms for location ID: ${id}`);
                const roomsData = await fetchRoomsByLocation(id);
                console.log("✅ Fetched rooms:", roomsData);
                setRooms(roomsData);
            } catch (error) {
                console.error("❌ Error fetching rooms:", error);
                setError("Không thể tải danh sách phòng. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };

        getRooms();
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Danh Sách Phòng
                </h1>

                {loading && <p className="text-center text-gray-500">Đang tải danh sách phòng...</p>}
                {error && <p className="text-center text-red-500 font-bold">{error}</p>}

                {rooms.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {rooms.map((room) => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                ) : (
                    !loading && <p className="text-center text-gray-500">Không có phòng nào được tìm thấy.</p>
                )}
            </div>

            {/* Google Map Section */}
            <div className="w-full h-64 mt-4 border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6784734319014!2d105.84117007508365!3d21.005993780636966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac7431e45f7b%3A0x2f9e686ecb3e0c3!2zSG_DoG4gS8OgbmcgTWFsbA!5e0!3m2!1sen!2s!4v1646938476886!5m2!1sen!2s"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            </div>
            <Footer />
        </div>
        
    );
};

export default RoomsByLocation;
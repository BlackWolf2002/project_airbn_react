import { useState } from "react";
import {
    fetchRooms,
    addRoom,
    updateRoom,
    deleteRoom,
} from "../api/roomService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchRoomData = async (page)=>{
        try{
            const response = await fetchRooms(page,10);
            setRooms(response.data.content)
            setTotalPages(response.data.totalPages)
        }
    }


    const handleDelete = async(id) =>{
        try{
            await deleteRoom(id);
            
        }
    }
    
};
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchLocations } from "../api/apiService";
import "../style/Home.css";

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const videoRefs = useRef([]);
    const videos = [
        "https://videos.pexels.com/video-files/3971351/3971351-uhd_2560_1440_25fps.mp4",
        "https://videos.pexels.com/video-files/3140099/3140099-hd_1920_1080_30fps.mp4",
        "https://videos.pexels.com/video-files/1730393/1730393-uhd_2560_1440_25fps.mp4",
        "https://videos.pexels.com/video-files/1723017/1723017-uhd_2560_1440_25fps.mp4"
    ];

    useEffect(() => {
        const handleVideoPlayback = () => {
            videoRefs.current.forEach((videoElement) => {
                const handleLoadedData = () => {
                    const playPromise = videoElement.play();

                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // Video is playing
                        }).catch((error) => {
                            // Auto-play was prevented
                            console.error("Error attempting to play video:", error);
                        });
                    }
                };

                videoElement.addEventListener('loadeddata', handleLoadedData);
                videoElement.load(); // Ensure the video is loaded
            });
        };
        handleVideoPlayback();
    }, [videos]);

    const handleSearch = async (event) => {
        const query = event.target.value;
        setSearch(query);
        if (query.length > 2) {
            const results = await searchLocations(query);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    const selectLocation = (location) => {
        navigate(`/rooms?location=${location.id}`);
    };

    return (
        <div className="relative h-[770px]">
            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2 gap-0 z-0">
                {videos.map((video, index) => (
                    <video
                        key={index}
                        ref={(el) => (videoRefs.current[index] = el)}
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                    >
                        <source
                            src={video}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                ))}
            </div>
            <div className="relative z-10 h-full" id="header">
                <nav
                    className="flex justify-between p-5"
                    style={{
                        background: 'rgba(255, 255, 255, 0.35)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        backdropFilter: 'blur(3px)',
                        WebkitBackdropFilter: 'blur(3px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                >
                    <div className="text-red-600 font-bold text-3xl hover:text-red-400 cursor-pointer">airbnb</div>

                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Bạn sắp đi đâu?"
                            value={search}
                            onChange={handleSearch}
                            className="placeholder-red-400"
                        />
                        <button className="search-btn">🔍</button>
                        {suggestions.length > 0 && (
                            <ul className="suggestion-list">
                                {suggestions.map((loc) => (
                                    <li
                                        key={loc.id}
                                        onClick={() => selectLocation(loc)}
                                    >
                                        {loc.tenViTri}, {loc.tinhThanh}, {loc.quocGia}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="nav-links flex space-x-4">
                        <Link to="/login" className="mx-2">
                            <a
                                href="#_"
                                className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.35)',
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                    backdropFilter: 'blur(3px)',
                                    WebkitBackdropFilter: 'blur(3px)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                }}
                            >
                                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Đăng Nhập</span>
                            </a>
                        </Link>
                        <Link to="/register" className="mx-2">
                            <a
                                href="#_"
                                className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.35)',
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                    backdropFilter: 'blur(3px)',
                                    WebkitBackdropFilter: 'blur(3px)',
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                }}
                            >
                                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Đăng Ký</span>
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
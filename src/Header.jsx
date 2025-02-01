import { useEffect, useRef } from 'react';

export const Header = () => {
    const videoRefs = useRef([]);

    const videos = [        
        "/video/3971351-uhd_3840_2160_25fps.mp4",
        "/video/3140099-hd_1920_1080_30fps.mp4",
        "/video/1730393-uhd_3840_2160_25fps.mp4",
        "/video/1723017-uhd_3840_2160_25fps.mp4",
        
    ];

    useEffect(() => {
        videoRefs.current.forEach((videoElement) => {
            const handleLoadedData = () => {
                const playPromise = videoElement.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        // Phát video tự động!
                        // Hiển thị giao diện đang phát.
                    }).catch((error) => {
                        // Tự động phát bị ngăn chặn
                        // Hiển thị giao diện tạm dừng.
                        console.error("Lỗi khi cố gắng phát video:", error);
                    });
                }
            };

            videoElement.addEventListener('loadeddata', handleLoadedData);
            videoElement.load(); // Thêm dòng này để đảm bảo video được tải lại
            return () => {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            };
        });
    }, [videos]);

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
                        Trình duyệt của bạn không hỗ trợ thẻ video.
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
                    <ul className="flex text-lg font-bold">
                        <li className="mx-5 cursor-pointer hover:text-red-400">Home</li>
                        <li className="mx-5 cursor-pointer hover:text-red-400">About</li>
                        <li className="mx-5 cursor-pointer hover:text-red-400">Services</li>
                        <li className="mx-5 cursor-pointer hover:text-red-400">Pricing</li>
                        <li className="mx-5 cursor-pointer hover:text-red-400">Contact</li>
                    </ul>
                    <div className="flex">
                        <button className="mx-2">
                            <a
                                href="#_"
                                className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.35)',
                                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                                    backdropFilter: 'blur(3px)',
                                    WebkitBackdropFilter: 'blur(3px)',
                                }}
                            >
                                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Sign up</span>
                            </a>
                        </button>
                        <button className="mx-2">
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
                                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Log in</span>
                            </a>
                        </button>
                    </div>
                </nav>
                <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold border-4 border-white p-5 rounded-full relative group top-[-80px]">Welcome
                            <p className="mt-4 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-full left-1/2 transform -translate-x-1/2">Enjoy your journey</p>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
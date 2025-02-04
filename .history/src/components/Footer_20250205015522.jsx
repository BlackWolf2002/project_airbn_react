import React from "react";
import "../style/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* 4 Cột */}
                <div className="footer-section">
                    <h3>GIỚI THIỆU</h3>
                    <ul>
                        <li>Phương thức hoạt động của Airbnb</li>
                        <li>Trang tin tức</li>
                        <li>Nhà đầu tư</li>
                        <li>Airbnb Plus</li>
                        <li>Airbnb Luxe</li>
                        <li>HotelTonight</li>
                        <li>Airbnb for Work</li>
                        <li>Nhờ có Host, mọi điều đều có thể</li>
                        <li>Cơ hội nghề nghiệp</li>
                        <li>Thư của nhà sáng lập</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>CỘNG ĐỒNG</h3>
                    <ul>
                        <li>Sự đa dạng và cảm giác thân thuộc</li>
                        <li>Tiện nghi phù hợp cho người khuyết tật</li>
                        <li>Đặt lại tên kết Airbnb</li>
                        <li>Chỗ ở cho tuyến đầu</li>
                        <li>Luật giới thiệu của thiết bị</li>
                        <li>Airbnb.org</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>ĐÓN TIẾP KHÁCH</h3>
                    <ul>
                        <li>Cho thuê nhà</li>
                        <li>Tổ chức Trải nghiệm trực tuyến</li>
                        <li>Tổ chức trải nghiệm</li>
                        <li>Đón tiếp khách có trách nhiệm</li>
                        <li>Trung tâm tài nguyên</li>
                        <li>Trung tâm cộng đồng</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>HỖ TRỢ</h3>
                    <ul>
                        <li>Biện pháp ứng phó với đại dịch COVID-19</li>
                        <li>Trung tâm trợ giúp</li>
                        <li>Các tùy chọn hủy</li>
                        <li>Hỗ trợ khu dân cư</li>
                        <li>Tin cậy và an toàn</li>
                    </ul>
                </div>
            </div>

            {/* Bản quyền + Cài đặt */}
            <div className="footer-bottom">
                <p>
                    © 2024 Airbnb, Inc. Mọi quyền được bảo lưu. ·{" "}
                    <a href="#">Quyền riêng tư</a> · <a href="#">Điều khoản</a>{" "}
                    · <a href="#">Sơ đồ trang web</a>
                </p>
                <div className="footer-settings">
                    <span>🌍 Tiếng Việt (VN)</span>
                    <span>💲 USD</span>
                    <span>📷 📘 🐦</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

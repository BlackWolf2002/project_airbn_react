class ViTriView {
    constructor(id, tenViTri, tinhThanh, quocGia, hinhAnh) {
        this.id = id;
        this.tenViTri = tenViTri;
        this.tinhThanh = tinhThanh;
        this.quocGia = quocGia;
        this.hinhAnh = hinhAnh;
    }
}

// Ví dụ sử dụng
const viTri = new ViTriView(1, 'Hà Nội', 'Hà Nội', 'Việt Nam', 'hanoi.jpg');
console.log(viTri);

export default ViTriView;
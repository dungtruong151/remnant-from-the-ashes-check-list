# Remnant: From the Ashes - Checklist Tracker

Web app theo dõi tiến trình thu thập vật phẩm trong game **Remnant: From the Ashes**.

## Tính năng

- Theo dõi vũ khí, giáp, boss, traits, mods, rings, amulets, events
- Tìm kiếm theo tên, địa điểm, hiệu ứng
- Lọc theo độ hiếm (Normal / Rare / Boss / DLC) và trạng thái (Đã có / Chưa có)
- Thanh tiến trình tổng thể và theo từng danh mục
- Lưu tiến trình tự động trên trình duyệt (localStorage)
- Giao diện responsive, hoạt động trên cả desktop và mobile

## Chạy ứng dụng

Đây là ứng dụng web tĩnh (HTML/CSS/JS thuần), không cần build hay cài đặt dependency.

### Cách 1: Mở trực tiếp

Mở file `index.html` bằng trình duyệt bất kỳ (Chrome, Firefox, Edge...).

### Cách 2: Dùng Live Server (VS Code)

1. Cài extension **Live Server** trong VS Code
2. Click chuột phải vào `index.html` > **Open with Live Server**

### Cách 3: Dùng HTTP server

```bash
# Python
python -m http.server 8080

# Node.js (cần cài http-server)
npx http-server -p 8080
```

Sau đó truy cập `http://localhost:8080` trên trình duyệt.

## Cấu trúc file

```
index.html   - Trang chính
style.css    - Giao diện
app.js       - Logic ứng dụng (render, filter, localStorage)
data.js      - Dữ liệu game (vũ khí, boss, traits, ...)
```

## Sử dụng

- Click vào vật phẩm để đánh dấu **đã thu thập** hoặc **bỏ đánh dấu**
- Dùng thanh tìm kiếm và bộ lọc để tìm vật phẩm cần thiết
- Nhấn **Reset** để xóa toàn bộ tiến trình
- Tiến trình được lưu tự động, đóng trình duyệt và mở lại vẫn giữ nguyên

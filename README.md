# Remnant: From the Ashes - Checklist Tracker

Web app theo doi tien trinh thu thap vat pham trong game **Remnant: From the Ashes**.

## Tinh nang

- Theo doi vu khi, giap, boss, traits, mods, rings, amulets, events
- Tim kiem theo ten, dia diem, hieu ung
- Loc theo do hiem (Normal / Rare / Boss / DLC) va trang thai (Da co / Chua co)
- Thanh tien trinh tong the va theo tung danh muc
- Luu tien trinh tu dong tren trinh duyet (localStorage)
- Giao dien responsive, hoat dong tren ca desktop va mobile

## Chay ung dung

Day la ung dung web tinh (HTML/CSS/JS thuan), khong can build hay cai dat dependency.

### Cach 1: Mo truc tiep

Mo file `index.html` bang trinh duyet bat ky (Chrome, Firefox, Edge...).

### Cach 2: Dung Live Server (VS Code)

1. Cai extension **Live Server** trong VS Code
2. Click chuot phai vao `index.html` > **Open with Live Server**

### Cach 3: Dung HTTP server

```bash
# Python
python -m http.server 8080

# Node.js (can cai http-server)
npx http-server -p 8080
```

Sau do truy cap `http://localhost:8080` tren trinh duyet.

## Cau truc file

```
index.html   - Trang chinh
style.css    - Giao dien
app.js       - Logic ung dung (render, filter, localStorage)
data.js      - Du lieu game (vu khi, boss, traits, ...)
```

## Su dung

- Click vao vat pham de danh dau **da thu thap** hoac **bo danh dau**
- Dung thanh tim kiem va bo loc de tim vat pham can thiet
- Nhan **Reset** de xoa toan bo tien trinh
- Tien trinh duoc luu tu dong, dong trinh duyet va mo lai van giu nguyen

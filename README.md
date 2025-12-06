# 📘 Tutor Support System – Demo Version

Hệ thống hỗ trợ tìm kiếm Tutor dành cho sinh viên và giảng viên.
Phiên bản demo không cần database thật, sử dụng ReactJS (Frontend) và JSON-Server (Fake Backend).

## 🚀 1. Công nghệ sử dụng
Frontend

ReactJS + Vite / CRA

Material UI (MUI v5)

React Router DOM v6

Backend (Fake API)

JSON Server (REST API)

## 🛠 2. Cài đặt môi trường
📌 Yêu cầu

Node.js ≥ 16

npm hoặc yarn

Kiểm tra:

node -v
npm -v

## 📥 3. Clone dự án
git clone https://github.com/AtomTNB2202/tutor-finding-app-demo.git
cd tutor-finding-app-demo

## 📂 4. Cấu trúc dự án
tutor-finding-app-demo/
│── backend/
│   ├── db.json          # Fake database
│   └── server.js        # JSON-Server configuration
│
│── frontend/
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── README.md (file bạn đang xem)

## ▶ 5. Chạy Backend (JSON Server)
Bước 1 – Cài đặt JSON Server
cd backend
npm install

Bước 2 – Chạy API server
npm start


JSON Server mặc định chạy tại:

http://localhost:3001


Bạn có thể kiểm tra API ví dụ:

GET http://localhost:3001/users
GET http://localhost:3001/sessions
GET http://localhost:3001/resources

## 💻 6. Chạy Frontend (React)
Bước 1 – Cài đặt
cd frontend
npm install

Bước 2 – Chạy project
npm start


Frontend chạy tại:

http://localhost:3000

## 🔐 7. Tài khoản mẫu (Demo Login)
Student
Email	Vai trò
a@hcmut.edu.vn
	Student A
Tutor
Email	Vai trò
t@hcmut.edu.vn
	Tutor A

Chỉ cần nhập email → hệ thống tự nhận role từ db.json.

## 🎯 8. Tính năng chính
👨‍🎓 Student

Đăng ký thông tin cá nhân

Tìm kiếm Tutor theo môn học

Đặt lịch học

Xem lịch học đã đặt

Feedback sau buổi học

Xem tài nguyên học tập

👨‍🏫 Tutor

Quản lý lịch trống (Availability)

Xem danh sách session với sinh viên

Thêm tài nguyên hỗ trợ học tập

Cập nhật trạng thái session

## 🧩 9. Ghi chú kỹ thuật

Không cần database thật → mọi dữ liệu nằm trong db.json.

JSON Server tự động:

Auto-increment ID

Fake REST API đầy đủ (GET, POST, PUT, DELETE)

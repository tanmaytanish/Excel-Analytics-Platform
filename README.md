

# 📊 Visualyze

**Visualyze** is a full-stack web application that allows users to register, log in, upload Excel/CSV files, and view past uploads. It provides a seamless experience for analyzing spreadsheet data securely and efficiently.

🔗 **Live Demo:** [https://excel-analytics-platform.vercel.app/](https://excel-analytics-platform.vercel.app/)

---

## 🚀 Features

* ✅ User registration and login with **JWT authentication**
* 🔐 Protected dashboard accessible only after login
* 📁 Upload support for **.xlsx**, **.xls**, and **.csv** files
* 🧾 View a history of uploaded files
* 📊 Plan for future visualization and insights
* 🎨 Modern, responsive UI using **React Bootstrap**
* 🧪 Built with clean and scalable code

---

## 🛠 Tech Stack

### **Frontend**

* React
* React Router
* React Bootstrap
* Axios
* Custom CSS

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* Multer (for file uploads)
* JWT (for authentication)
* CORS

---

## 📦 Project Structure

```
visualyze/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Signup.jsx
        │   ├── Dashboard.jsx
        ├── styles/
        ├── App.jsx
        └── main.jsx
```

---

## 📲 Getting Started

### 🔧 Prerequisites

* Node.js (v14+)
* MongoDB instance (local or Atlas)
* npm

### 📥 1. Clone the Repository

```bash
git clone https://github.com/yourusername/visualyze.git
cd visualyze
```

### 📦 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

### ▶️ 3. Start the App

#### Start Backend

```bash
cd backend
node server.js
# Runs on http://localhost:5000
```

#### Start Frontend

```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

---

## 🔐 API Endpoints

### 📤 Register

```http
POST /api/register
Content-Type: application/json

{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### 🔑 Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### 🔒 Protected Route Example

```http
GET /api/uploads
Authorization: Bearer <your-jwt-token>
```

### 📁 Upload File

```http
POST /api/upload
Content-Type: multipart/form-data

file: <your-excel-or-csv-file>
Authorization: Bearer <your-jwt-token>
```

---

## ⚠️ Notes

* User data and uploaded files are stored in **MongoDB**.
* JWT secret and DB URI should be stored in a **`.env`** file.
* Only authenticated users can upload or view files.
* This is a learning/demo app — for production, implement full validation and error handling.

---

## 📄 License

MIT

---

## 👨‍💻 Author

**Tanish**
Built with 💻 and ☕ — Feel free to fork and extend this project!

---

Would you like me to generate the actual `README.md` file as a downloadable file too?

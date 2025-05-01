// backend/server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Use .env in production

let users = [];

app.use(cors());
app.use(express.json());

// Register
app.post("/api/register", (req, res) => {
    const { username, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = { id: Date.now(), username, email, password };
    users.push(newUser);
    res.status(201).json({ message: "Registered successfully" });
});

// Login
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, user: { username: user.username, email: user.email } });
});

// Protected route
app.get("/api/protected", (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Token required" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: "Access granted", user: decoded });
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));

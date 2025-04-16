const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fs = require("fs");
const { readData, writeData } = require("./file");
const movies = require("./movies.json");

const app = express();
const port = 3001;

app.use(express.json());

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    const token = authHeader.split(" ")[1]; // only the token part
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token." });
      }
      req.user = user;
      next();
    });
  };
  

// User Registration
app.post("/users", (req, res) => {
    const users = readData("users");
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    writeData("users", users);
    res.status(201).json({ message: "User registered!", user: newUser });
});

// User Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = readData("users");
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token });
});

// Example Protected Route (requires JWT token)
app.get("/users", authenticateJWT, (req, res) => {
    res.json(readData("users"));
});
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

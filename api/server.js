import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

config(); // Load environment variables

const app = express();
app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json()); // Enable JSON parsing for request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/inventoryDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error", error));

// Define Mongoose Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Mock Inventory Data
const products = [
  { id: 1, name: "Laptop Pro", inventory: 45 },
  { id: 2, name: "Wireless Mouse", inventory: 123 },
  { id: 3, name: "4K Monitor", inventory: 28 },
  { id: 4, name: "Mechanical Keyboard", inventory: 67 },
  { id: 5, name: "USB-C Hub", inventory: 92 },
];

// Graph Data
const groupData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

// Routes

app.get("/", (req, res) => {
  res.send("Health Check. App running successfully!");
});

// Get Inventory
app.get("/api/inventory", (req, res) => {
  res.json({
    data: products,
    success: "success",
    message: "Inventory fetched successfully!",
  });
});

// Get Graph Data
app.get("/api/graphData", (req, res) => {
  res.json({
    data: groupData,
    success: "success",
    message: "Graph data fetched successfully!",
  });
});

// Create User (Signup)
app.post("/api/create-user", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login User
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

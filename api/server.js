import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

config();

const app = express();
app.use(cors({ origin: process.env.ORIGIN || ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error", error));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const products = [
  { id: 1, name: "Laptop Pro", inventory: 155 },
  { id: 2, name: "Wireless Mouse", inventory: 15 },
  { id: 3, name: "4K Monitor", inventory: 28 },
  { id: 4, name: "Mechanical Keyboard", inventory: 67 },
  { id: 5, name: "USB-C Hub", inventory: 170 },
  { id: 6, name: "Gaming Headset", inventory: 45 },
  { id: 7, name: "Portable SSD 1TB", inventory: 120 },
  { id: 8, name: "Bluetooth Speaker", inventory: 60 },
  { id: 9, name: "Ergonomic Chair", inventory: 33 },
  { id: 10, name: "Smartphone Stand", inventory: 75 },
  { id: 11, name: "Graphic Tablet", inventory: 20 },
  { id: 12, name: "Webcam 1080p", inventory: 50 },
  { id: 13, name: "Wireless Earbuds", inventory: 90 },
  { id: 14, name: "Standing Desk", inventory: 25 },
  { id: 15, name: "VR Headset", inventory: 10 },
  { id: 16, name: "HDMI Cable (6ft)", inventory: 200 },
  { id: 17, name: "Smartwatch", inventory: 40 },
  { id: 18, name: "External Hard Drive 2TB", inventory: 85 },
  { id: 19, name: "Noise-Cancelling Headphones", inventory: 55 },
  { id: 20, name: "Wireless Charging Pad", inventory: 110 }
];


const groupData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

app.get("/", (req, res) => {
  res.send("Health Check. App running successfully!");
});

app.get("/api/inventory", (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 8; 
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / limit);

  res.json({
    data: paginatedProducts,
    totalPages,
    currentPage: page,
    totalProducts: products.length,
    success: true,
    message: "Inventory fetched successfully!",
  });
});

app.get("/api/graphData", (req, res) => {
  res.json({
    data: groupData,
    success: "success",
    message: "Graph data fetched successfully!",
  });
});

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

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
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

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

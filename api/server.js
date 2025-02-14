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

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error", error));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);


// ✅ Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  inventory: { type: Number, required: true },
});

export const Product = mongoose.model("Product", productSchema);

// ✅ Graph Data Schema
const graphSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

export const GraphData = mongoose.model("GraphData", graphSchema);


// ✅ Health Check
app.get("/", (req, res) => {
  res.send("Health Check. App running successfully!");
});

// ✅ Fetch Inventory (Paginated from MongoDB)
app.get("/api/inventory", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  
  try {
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: products,
      totalPages,
      currentPage: page,
      totalProducts,
      success: true,
      message: "Inventory fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory" });
  }
});

// ✅ Add New Product to Database
app.post("/api/products", async (req, res) => {
  const { name, inventory } = req.body;

  try {
    if (!name || inventory == null) {
      return res.status(400).json({ error: "Product name and inventory are required" });
    }

    const newProduct = new Product({ name, inventory });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

// ✅ Fetch Graph Data from MongoDB
app.get("/api/graphData", async (req, res) => {
  try {
    const graphData = await GraphData.find();
    res.json({
      data: graphData,
      success: true,
      message: "Graph data fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching graph data" });
  }
});

// ✅ User Registration
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

// ✅ User Login
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

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

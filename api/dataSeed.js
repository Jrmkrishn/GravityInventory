import mongoose from "mongoose";
import dotenv from "dotenv";
import { GraphData, Product } from "./server.js";

dotenv.config();

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// ✅ Seed Data
const seedDatabase = async () => {
  try {
    await Product.deleteMany();
    await GraphData.deleteMany();

    // ✅ Insert Products
    const products = [
      { name: "Laptop Pro", inventory: 155 },
      { name: "Wireless Mouse", inventory: 15 },
      { name: "4K Monitor", inventory: 28 },
      { name: "Mechanical Keyboard", inventory: 67 },
      { name: "USB-C Hub", inventory: 170 },
      { name: "Gaming Headset", inventory: 45 },
      { name: "Portable SSD 1TB", inventory: 120 },
      { name: "Bluetooth Speaker", inventory: 60 },
      { name: "Ergonomic Chair", inventory: 33 },
      { name: "Smartphone Stand", inventory: 75 },
      { name: "Graphic Tablet", inventory: 20 },
      { name: "Webcam 1080p", inventory: 50 },
      { name: "Wireless Earbuds", inventory: 90 },
      { name: "Standing Desk", inventory: 25 },
      { name: "VR Headset", inventory: 10 },
      { name: "HDMI Cable (6ft)", inventory: 200 },
      { name: "Smartwatch", inventory: 40 },
      { name: "External Hard Drive 2TB", inventory: 85 },
      { name: "Noise-Cancelling Headphones", inventory: 55 },
      { name: "Wireless Charging Pad", inventory: 110 },
    ];

    await Product.insertMany(products);
    console.log("✅ Products Seeded Successfully");

    // ✅ Insert Graph Data
    const graphData = [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 300 },
      { name: "Mar", value: 600 },
      { name: "Apr", value: 800 },
      { name: "May", value: 500 },
      { name: "Jun", value: 700 },
    ];

    await GraphData.insertMany(graphData);
    console.log("✅ Graph Data Seeded Successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    mongoose.connection.close();
  }
};

// ✅ Run Seeder
seedDatabase();

### **📌 README.md**
```md
# 🛒 Product Inventory Dashboard

A simple **React + Express** dashboard that displays and manages product inventory with sorting and pagination.

## 🚀 Features
✅ **Product Listing** – Displays all products  
✅ **Sorting** – Sort by name or inventory (ascending/descending)  
✅ **Pagination** – Navigate between pages with Next/Previous  
✅ **Loading Skeletons** – Better UX when fetching data  
✅ **Optimized API** – Supports pagination & sorting  

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, TailwindCSS, React Query
- **Backend:** Node.js, Express
- **Icons:** Lucide React
- **API Calls:** Fetch API with React Query

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repo**
```sh
git clone https://github.com/Jrmkrishn/GravityInventory.git
cd GravityInventory
```

### **2️⃣ Install Dependencies**
```sh
# Install frontend dependencies
npm install

### **3️⃣ Start the Backend**
```sh
cd api
nodemon server.js
```
Server runs at **http://localhost:8000**

### **4️⃣ Start the Frontend**
```sh
cd frontend
npm run dev
```
Frontend runs at **http://localhost:5173**

---

## 📡 API Endpoints

### **1️⃣ Fetch Inventory (Paginated)**
```http
GET /api/inventory?page=1&limit=5
```
#### ✅ **Response Example**
```json
{
  "data": [
    { "id": 1, "name": "Laptop Pro", "inventory": 155 },
    { "id": 2, "name": "Wireless Mouse", "inventory": 15 }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "totalProducts": 25,
  "success": true,
  "message": "Inventory fetched successfully!"
}
```

---

## 🎨 UI Components
✅ **Table:** Displays inventory  
✅ **Sorting Dropdown:** Sort by name/inventory  
✅ **Pagination Controls:** Next/Previous buttons  
✅ **Skeleton Loaders:** For smooth UX  

---

## 🛠️ To-Do (Future Enhancements)
- ✅ Search functionality 🔍
- ✅ Dark mode 🌙
- ✅ Editable inventory 📊

---

## 📜 License
MIT License © 2025 Jayaramkrishnan
```


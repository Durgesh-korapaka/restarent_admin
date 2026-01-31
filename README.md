# 🍽️ Restaurant Admin Dashboard – Eatoes Intern Assignment

A full-stack Restaurant Admin Dashboard built using **React, Node.js, Express, and MongoDB**.  
This application allows restaurant owners to manage menu items, track orders, and update order statuses efficiently.

---

## 🚀 Features Implemented

### 🔹 Menu Management
- View all menu items in a clean admin table
- Search menu items by name or ingredients (debounced search)
- Filter menu items by category
- Toggle item availability (Optimistic UI update)
- Real-time UI updates without page reload

### 🔹 Orders Dashboard
- View all orders with status
- Filter orders by status (Pending, Preparing, Ready, Delivered, Cancelled)
- Update order status from dropdown
- Clean and readable card-based layout

### 🔹 Performance & UX
- Debounced search (300ms delay)
- Optimistic UI updates
- Loading and error handling
- Centralized API layer
- Clean component architecture

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Custom CSS (no heavy UI libraries)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Project Structure

restaurant-admin/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── seed/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── assets/
│ │ ├── App.jsx
│ │ └── index.css
│
└── README.md
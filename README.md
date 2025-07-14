# 🛒 E-Commerce API – AdaptNXT Internship Project

## 📝 Overview

This is a **Node.js-based backend API** built for a simple E-Commerce system as part of the **Backend Developer Internship at AdaptNXT**. It includes **user authentication with role-based access**, **product listings**, **cart and order management**, and admin functionalities.

> ✅ Technologies Used: `Node.js`, `Express.js`, `MongoDB`, `Mongoose`, `JWT`, `bcryptjs`

---

## 📦 Features

### 👥 User Roles & Authentication
- **JWT-based authentication** (`/api/v1/users/login`)
- **Two roles:**
  - `Customer`: View products, manage cart, place orders
  - `Admin`: Manage products, categories, and orders

### 🛍 Product Management
- CRUD operations for products
- Fetch featured products and product count
- Upload product images via Multer

### 📂 Categories
- Create, update, delete, and fetch product categories

### 🛒 Cart & Order System
- Add items to cart
- Create and manage orders
- Fetch order history per user

### 📤 Optional Add-ons
- Pagination and search for products
- Basic frontend using HTML + JS

---

## 🚀 Getting Started

### 🧩 Prerequisites
- Node.js v18+
- MongoDB Atlas or local MongoDB instance

### ⚙️ Setup

```bash
git clone https://github.com/ManojCodeCraft/Simple-E-Commerce-API.git
cd Simple-E-Commerce-API/Backend
npm install
```

### 📄 Environment Variables

Create a `.env` file with the following:

```env
CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce
API_URL=/api/v1
secret=your_jwt_secret_key
```

---

## 🔄 API Endpoints

### 📘 Products

| Method | Endpoint                          | Description               |
|--------|-----------------------------------|---------------------------|
| GET    | /api/v1/products                  | List all products         |
| GET    | /api/v1/products/:id              | Get a single product      |
| POST   | /api/v1/products                  | Add product (Admin only)  |
| PUT    | /api/v1/products/:id              | Update product (Admin)    |
| DELETE | /api/v1/products/:id              | Delete product (Admin)    |
| PUT    | /api/v1/products/gallery-images/:id | Upload multiple images    |
| GET    | /api/v1/products/get/featured/:count | Get featured products   |
| GET    | /api/v1/products/get/count        | Get total count           |

### 📂 Categories

| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| GET    | /api/v1/categories     | List categories           |
| POST   | /api/v1/categories     | Add new category          |
| DELETE | /api/v1/categories/:id | Delete a category         |

### 🛒 Orders

| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| GET    | /api/v1/orders         | List all orders            |
| POST   | /api/v1/orders         | Create a new order         |
| GET    | /api/v1/orders/:id     | Get single order           |
| PUT    | /api/v1/orders/:id     | Update order (Admin)       |
| DELETE | /api/v1/orders/:id     | Cancel order               |
| GET    | /api/v1/orders/get/count | Total orders              |

### 👤 Users

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | /api/v1/users/register | Register new user        |
| POST   | /api/v1/users/login    | Login user, get JWT      |
| GET    | /api/v1/users          | Get all users (Admin)    |
| GET    | /api/v1/users/:id      | Get user by ID           |
| DELETE | /api/v1/users/:id      | Delete user (Admin)      |

---

## 🔐 Security

- All sensitive routes are protected with **JWT** using `express-jwt`
- Roles verified via `isRevoked` method for admin access control

---

## 📁 Folder Structure

```
├── models/
├── routes/
├── controllers/
├── helpers/
├── public/uploads/
├── .env
├── app.js
```

---

## 🧪 Testing

Use **Postman** to test APIs. Example body for product creation:

```json
{
  "name": "Laptop",
  "description": "Fast laptop",
  "richDescription": "16GB RAM, 512GB SSD",
  "price": 55000,
  "countInStock": 10,
  "category": "<category_id>",
  "isFeatured": true
}
```

---

## 🏁 Conclusion

This backend project meets the internship assignment objectives and provides a production-ready boilerplate for a full-stack e-commerce system.

---

## 👨‍💻 Author

**Manoj Kumar**  
Backend Developer Intern – AdaptNXT  
GitHub: [@ManojCodeCraft](https://github.com/ManojCodeCraft)

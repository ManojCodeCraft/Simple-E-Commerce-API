# 🛍️ Simple E-Commerce API

A RESTful API for a basic e-commerce application built with **Node.js**, **Express**, and **MongoDB**. Features include user authentication, product listing, cart management, order creation, role-based access control, and admin functionality.

---

## 🚀 Features

- 🔐 JWT Authentication
- 👥 User Roles (Customer & Admin)
- 🛒 Cart Management
- 📦 Order Creation from Cart
- 🗂️ Category-wise Product Management
- 🔎 Product Search by Name
- 📄 Pagination Support for Product Listings
- 🌐 RESTful API Structure

---

## 🏗️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Environment:** Render (deployment)
- **Dev Tools:** Nodemon, Postman

---

## 🧑‍💻 API Endpoints Overview

### 🔐 Auth (`/api/users`)

| Method | Endpoint                    | Access        | Description               |
|--------|-----------------------------|---------------|---------------------------|
| POST   | `/register`                 | Public        | Register a new user       |
| POST   | `/login`                    | Public        | Login and receive JWT     |
| GET    | `/`                         | Admin Only    | Get all users             |
| GET    | `/:id`                      | Admin Only    | Get user by ID            |
| PUT    | `/:id`                      | Authenticated | Update user info          |
| PUT    | `/:id/password`             | Authenticated | Change user password      |
| DELETE | `/:id`                      | Authenticated | Delete user               |
| GET    | `/get/count`                | Authenticated | Get total user count      |

---

### 📦 Products (`/api/products`)

| Method | Endpoint              | Access      | Description                         |
|--------|------------------------|-------------|-------------------------------------|
| GET    | `/`                    | Public      | Get all products (with pagination)  |
| GET    | `/search`             | Public      | Search products by name             |
| GET    | `/:id`                | Public      | Get product by ID                   |
| POST   | `/`                   | Admin Only  | Create new product                  |
| PUT    | `/:id`                | Admin Only  | Update product                      |
| DELETE | `/:id`                | Admin Only  | Delete product                      |

---

### 🗂️ Categories (`/api/categories`)

| Method | Endpoint              | Access      | Description                |
|--------|------------------------|-------------|----------------------------|
| GET    | `/`                    | Public      | Get all categories         |
| GET    | `/:id`                | Public      | Get category by ID         |
| POST   | `/`                   | Admin Only  | Create category            |
| PUT    | `/:id`                | Admin Only  | Update category            |
| DELETE | `/:id`                | Admin Only  | Delete category            |

---

### 🛒 Cart (`/api/cart`)

| Method | Endpoint                    | Access        | Description               |
|--------|------------------------------|----------------|---------------------------|
| POST   | `/`                          | Authenticated | Add item to cart          |
| GET    | `/:userId`                  | Authenticated | Get cart by user ID       |
| PUT    | `/:itemId`                  | Authenticated | Update cart item quantity |
| DELETE | `/:itemId`                  | Authenticated | Remove cart item          |
| DELETE | `/clear/:userId`            | Authenticated | Clear all items from cart |

---

### 🧾 Orders (`/api/orders`)

| Method | Endpoint                     | Access        | Description                        |
|--------|-------------------------------|----------------|------------------------------------|
| POST   | `/`                           | Authenticated | Create order from cart             |
| GET    | `/`                           | Admin Only    | Get all orders                     |
| GET    | `/:id`                       | Authenticated | Get order by ID                    |
| GET    | `/user/:userId`             | Authenticated | Get orders by user ID              |
| PUT    | `/:id/status`               | Admin Only    | Update order status                |
| DELETE | `/:id`                       | Admin Only    | Delete order                       |
| GET    | `/get/totalsales`           | Admin Only    | Get total sales across all orders  |

---

## 🔐 Authentication & Roles

- JWT token must be included in the `Authorization` header as:
Authorization: Bearer <token>

- Roles:
- **Customer:** Can register, login, view products, manage cart, place orders.
- **Admin:** Has full access including managing users, products, categories, and orders.

---

## 📦 Installation

```bash
git clone https://github.com/ManojCodeCraft/Simple-E-Commerce-API.git
cd Simple-E-Commerce-API
npm install
Create a .env file:
PORT=5000
API_URL=/api
JWT_SECRET=your_jwt_secret
DB_URI=mongodb://localhost:27017/ecommerce
Start the server:
npm run dev
```
## 🌍 Deployment

The API is deployed on **Render**:  
🔗 [https://simple-e-commerce-api-bcpd.onrender.com](https://simple-e-commerce-api-bcpd.onrender.com)

---

## 📄 License.

This project is licensed under the [MIT License](LICENSE).


---

## 🤝 Credits

Built with 💻 by [ManojCodeCraft](https://github.com/ManojCodeCraft)




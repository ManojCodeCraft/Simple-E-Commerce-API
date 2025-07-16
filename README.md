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
## 📊 Database Schema

### 🛍️ Products

| Field           | Type       | Description                     |
|----------------|------------|---------------------------------|
| id             | string     | Product ID                      |
| name           | string     | Product name                    |
| description    | string     | Short description               |
| richDescription| string     | Full description                |
| image          | string     | Main image URL                  |
| images         | string[]   | Additional images               |
| brand          | string     | Brand name                      |
| price          | number     | Product price                   |
| category       | Category 🔗 | Reference to Category model     |
| countInStock   | number     | Inventory count                 |
| rating         | number     | Product rating                  |
| numReviews     | number     | Number of reviews               |
| isFeatured     | boolean    | Featured flag                   |
| dateCreated    | Date       | Creation timestamp              |

---

### 🗂️ Category

| Field | Type   | Description      |
|-------|--------|------------------|
| id    | string | Category ID      |
| name  | string | Category name    |
| color | string | Display color    |
| icon  | string | Icon URL         |
| image | string | Banner image     |

---

### 👤 Users

| Field         | Type    | Description          |
|---------------|---------|----------------------|
| id            | string  | User ID              |
| name          | string  | Full name            |
| email         | string  | Email address        |
| passwordHash  | string  | Hashed password      |
| street        | string  | Street address       |
| apartment     | string  | Apartment number     |
| city          | string  | City                 |
| zip           | string  | ZIP code             |
| country       | string  | Country              |
| phone         | string  | Phone number         |
| isAdmin       | boolean | Role identifier      |

---

### 📦 Orders

| Field            | Type           | Description                  |
|------------------|----------------|------------------------------|
| id               | string         | Order ID                     |
| orderItems       | OrderItem[] 🔗 | List of ordered items        |
| shippingAddress1 | string         | Primary address              |
| shippingAddress2 | string         | Secondary address (optional)|
| city             | string         | City                         |
| zip              | string         | ZIP code                     |
| country          | string         | Country                      |
| phone            | string         | Phone number                 |
| status           | string         | Order status                 |
| totalPrice       | number         | Total order price            |
| user             | User 🔗        | User who placed the order    |
| dateOrdered      | Date           | Order date                   |

---

### 📄 OrderItems

| Field    | Type       | Description           |
|----------|------------|-----------------------|
| id       | string     | Order item ID         |
| product  | Product 🔗 | Associated product     |
| quantity | number     | Quantity ordered      |

---

### 🛒 Cart

| Field    | Type       | Description                  |
|----------|------------|------------------------------|
| id       | string     | Cart ID                      |
| user     | User 🔗    | Reference to the user        |
| products | array      | List of items with quantity  |
| └ product| Product 🔗 | Each product in the cart     |
| └ quantity| number    | Quantity of that product     |

---
## 🔗 Relationships

Understanding how the models relate to each other:

- **Product ↔ Category**
  - Each product belongs to **one category**
  - Reference: `Product.category ➝ Category._id`

- **Product ↔ OrderItem**
  - Each order item includes a **single product**
  - Reference: `OrderItem.product ➝ Product._id`

- **Order ↔ OrderItems**
  - Each order has **multiple order items**
  - Reference: `Order.orderItems ➝ [OrderItem._id]`

- **Order ↔ User**
  - Each order is placed by a **single user**
  - Reference: `Order.user ➝ User._id`

- **Cart ↔ User**
  - Each user has a **single cart**
  - Reference: `Cart.user ➝ User._id`

- **Cart ↔ Products**
  - Cart contains an array of products with quantities
  - Reference: `Cart.products.product ➝ Product._id`

---

### 🔁 Summary Table

| From      | To        | Relationship         |
|-----------|-----------|----------------------|
| Product   | Category  | Many-to-One          |
| Order     | User      | Many-to-One          |
| Order     | OrderItem | One-to-Many          |
| OrderItem | Product   | Many-to-One          |
| Cart      | User      | One-to-One           |
| Cart      | Product   | Many-to-Many (via array) |

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
| PUT    | /api/v1/products/gallery-images/:id | Upload multiple images  |
| GET    | /api/v1/products/get/featured/:count | Get featured products |
| GET    | /api/v1/products/get/count        | Get total count           |
| GET    | /api/v1/products?name=phone       | Search products by name   |
| GET    | /api/v1/products?page=1&limit=10  | Paginated product list    |

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

🧺 **Cart**
| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| GET    | /api/v1/cart      | Get user's cart            |
| POST   | /api/v1/cart      | Add product to cart        |
| PUT    | /api/v1/cart/\:id | Update quantity of product |
| DELETE | /api/v1/cart/\:id | Remove product from cart   |


### 👤 Users

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | /api/v1/users/register | Register new user        |
| POST   | /api/v1/users/login    | Login user, get JWT      |
| GET    | /api/v1/users          | Get all users (Admin)    |
| GET    | /api/v1/users/:id      | Get user by ID           |
| DELETE | /api/v1/users/:id      | Delete user (Admin)      |

---

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

## 📃 License

This project is licensed under the [MIT License](LICENSE)
## 👨‍💻 Author

**Manoj Kumar**  
Backend Developer Intern – AdaptNXT  
GitHub: [@ManojCodeCraft](https://github.com/ManojCodeCraft)

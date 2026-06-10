# RentEase — Furniture & Appliance Rental Marketplace

A full-stack **MERN** rental marketplace where users can browse, rent, and manage furniture and appliances. Features a complete customer-facing storefront and a comprehensive admin dashboard for inventory and order management. Built with React, Node.js, MongoDB, and Tailwind CSS, deployed on Vercel.

---

## ✨ Features

**Customer Side**
- Browse product catalog with search and category filtering
- Add items to cart, manage rental durations, and checkout
- Secure registration and login with **JWT authentication**
- View active rentals and order history

**Admin Dashboard**
- Full inventory management — add, edit, delete products
- Order management with status tracking
- User management overview

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS, React Router |
| Backend | Node.js, Express.js, REST API |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens), bcrypt |
| Deployment | Vercel (frontend + serverless functions) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A MongoDB connection string (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone https://github.com/akashcpatil111/rentease-project.git
cd rentease-project
```

**Backend setup:**
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

```bash
npm start
```

**Frontend setup:**
```bash
cd client
npm install
npm start
```

The app runs at `http://localhost:3000`, the API at `http://localhost:5000`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login and receive JWT | ❌ |
| GET | `/api/products` | Get all products (supports `?category=` filter) | ❌ |
| GET | `/api/products/:id` | Get single product | ❌ |
| POST | `/api/orders` | Create rental order | ✅ |
| GET | `/api/orders/my` | Get user's orders | ✅ |
| GET | `/api/admin/products` | Admin: all products | ✅ Admin |
| POST | `/api/admin/products` | Admin: add product | ✅ Admin |
| PUT | `/api/admin/products/:id` | Admin: update product | ✅ Admin |
| DELETE | `/api/admin/products/:id` | Admin: delete product | ✅ Admin |

---

## 🚀 Deployment

Deployed on **Vercel**. To deploy your own instance:

1. Push this repo to GitHub
2. Import it in [Vercel](https://vercel.com)
3. Set environment variables: `MONGODB_URI`, `JWT_SECRET`
4. Deploy

---

## 📄 License

MIT License

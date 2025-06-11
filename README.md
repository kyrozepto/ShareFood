# ShareFood# ShareFood API

This is a **Node.js + Express** backend for a peer-to-peer food donation platform. The API supports user authentication, donation creation, request handling, and donor rating — all documented with **Swagger** for easy testing and integration.

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **MySQL** (via `mysql2`)
- **JWT** for authentication
- **bcrypt** for password hashing
- **multer** for file uploads
- **ImageKit** for image hosting
- **Swagger** (OpenAPI) for interactive API docs
- **dotenv**, **cors**, **morgan**

---

## 📁 Project Structure

```
src/
├── config/            # Database connection
├── controllers/       # Route handler logic
├── middlewares/       # JWT auth and file handling
├── models/            # MySQL database models
├── routes/            # Express route definitions
├── utils/             # ImageKit utilities
server.js              # App entry point
```

---

## 🔐 Authentication

All protected routes require a **Bearer Token**.

Include this header for authenticated endpoints:

```
Authorization: Bearer <your_token_here>
```

Tokens are returned upon login and expire in 5 hours.

---

## 📄 API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:5000/api-docs
```

You can try out:

- User registration and login
- Creating donations and uploading images
- Submitting requests
- Rating completed donations

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sharefood-api.git
cd sharefood-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory

### 4. Start the development server

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```

Swagger UI at:

```
http://localhost:5000/api-docs
```

---

## 📌 Sample Endpoints

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| POST   | `/api/user`       | Register a new user          |
| POST   | `/api/user/login` | Login and receive JWT        |
| GET    | `/api/donation`   | Get all donations            |
| POST   | `/api/donation`   | Create a donation with image |
| POST   | `/api/request`    | Request a donation           |
| POST   | `/api/rating`     | Rate a completed donation    |

---

## ✅ Features

- JWT-secured endpoints for all user actions
- Donation images uploaded via ImageKit
- Swagger documentation for easy testing
- Strong validation on inputs (length, type, logic)
- Request approval updates donation status automatically

---

## 🧑‍💻 Contributor

1. **Bahiskara Ananda Arryanto** (22081010181)
2. **Iko Indra Gunawan** (22081010003)

# Instagram Backend

A robust backend for an Instagram-like social media application built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Redis**. This project provides user authentication, post creation, following system, stories, media uploads, and more.

---

## ✨ Features

- JWT-based Authentication (register, login, logout, refresh)
- User profile management
- Follow system with private account support
- Post creation, like, comment, archive
- Story feed and marking as viewed
- Media uploads (images/videos)
- Redis caching
- MongoDB for persistent data storage

---

## 📦 Technologies

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Redis
- Docker & Docker Compose
- Babel (for build)

---

## 📁 Project Structure

```
instagram_backend/
├── src/
│   ├── config/               # Configuration (e.g. DB, Redis)
│   ├── controllers/          # Request handlers
│   ├── interfaces/           # TypeScript interfaces
│   ├── middleware/           # Middleware functions
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Route definitions
│   ├── services/             # Business logic
│   ├── types/                # Global custom types
│   ├── utils/                # Utility/helper functions
│   └── app.ts                # Main app entry
├── dist/                     # Compiled JS output (build)
├── story/                    # (Optional) Story features
├── tests/                    # Unit/integration tests
├── uploads/                  # Uploaded media storage
├── .babelrc
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── jest.config.js
├── package.json
└── README.md

```

---

## 🔐 Environment Variables Documentation

The application uses the following environment variables. Store them securely in a `.env` file at the root of your project:

| Variable Name | Required | Example / Default | Description |
|---------------|----------|-------------------|-------------|
| `MONGO_URI` | ✅ Yes | `"mongodb+srv://adarshXpal:rinkiya69@prototype.1h98yf7.mongodb.net/?retryWrites=true&w=majority&appName=Prototype"` | MongoDB connection string (use your own Atlas URI) |
| `JWT_SECRET` | ✅ Yes | `Adarsh` | Secret key used for JWT signing and verification |
| `EMAIL_USER` | ✅ Yes | `protoyoru07@gmail.com` | Gmail address for sending emails (e.g., reset password) |
| `EMAIL_PASS` | ✅ Yes | `"uugz xzzt mxbi yzkp"` | Gmail App Password (not your real password) |
| `NODE_ENV` | No | `development` | Defines environment (`development` or `production`) |
| `PORT` | No | `3000` | Port on which server runs |
| `REDIS_HOST` | No | `redis` | Redis host, usually `redis` in Docker |
| `REDIS_PORT` | No | `6379` | Redis port |

> ⚠️ **Important**: Keep `.env` files out of version control by adding them to `.gitignore`.

### 📝 Sample `.env` File

```env
MONGO_URI="mongodb+srv://adarshXpal:rinkiya69@prototype.1h98yf7.mongodb.net/?retryWrites=true&w=majority&appName=Prototype"
JWT_SECRET=Adarsh
EMAIL_USER=protoyoru07@gmail.com
EMAIL_PASS="uugz xzzt mxbi yzkp"
NODE_ENV=development
PORT=3000
REDIS_HOST=redis
REDIS_PORT=6379
```

> ℹ️ Update values based on your Docker setup or local development needs.

---

## 🏑 Docker Setup

### Run with Docker Compose:
-Make sure nothing is running on port REDIS_PORT=6379, If running kill it !

```bash
sudo docker-compose up --build
```

### Dockerfile Summary

- Uses Node 18 Alpine
- Installs dependencies
- Builds TypeScript
- Runs server from `dist/app.js`

---

## ✍️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/adarshXpal/Instagram_Backend.git
cd Instagram_Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Refer to the environment section above.

### 4. Build and run locally
-Change REDIS_HOST=localhost in .env, if running locally !! 
-Install mongodb and redis locally, and only run redis if not using docker !!

```bash
npm run build
npm start
```

OR use dev mode:

```bash
npm run dev
```

---
## 🔹 API Documentation

This project uses **Swagger (OpenAPI 3.0)** for complete API documentation.

### 📘 Swagger UI (Local)

Once the server is running, access the Swagger UI at: http://localhost:3000/api-docs
```bash
http://localhost:3000/api-docs
```


## ✅ Testing

> Tests are currently **not implemented**.

---

## 📚 Submission Checklist

-

---

## ☕ Author

Made with passion by [adarshXpal](https://github.com/adarshXpal)

---

## 🌟 License

[MIT](LICENSE)


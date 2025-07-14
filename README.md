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

## ⚙️ Environment Variables

Place them in a `.env` file at the root.

```
PORT=3000
MONGO_URI=mongodb://mongo:27017/instagram
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
```

> ℹ️ Update values based on your Docker setup or local development needs.

---

## 🏑 Docker Setup

### Run with Docker Compose:

```bash
sudo docker-compose up --build
```

### Dockerfile Summary

- Uses Node 18 Alpine
- Installs dependencies
- Builds TypeScript
- Runs server from `dist/index.js`

---

## 🔹 API Documentation

You can find the API endpoints categorized in the screenshots provided in this repository:

- **Authentication APIs**
- **User Management APIs**
- **Follow System APIs**
- **Posts, Comments, Stories, and Media Upload APIs**

> For full request/response examples, please refer to the [Postman collection or Swagger](#) *(placeholder)*

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

```bash
npm run build
npm start
```

OR use dev mode:

```bash
npm run dev
```

---

## ✅ Testing

> Tests are currently **not implemented**. To meet the submission requirement, you may add tests with **Jest** and ensure **minimum 70% coverage**.

---

## 📚 Submission Checklist

-

---

## ☕ Author

Made with passion by [adarshXpal](https://github.com/adarshXpal)

---

## 🌟 License

[MIT](LICENSE)


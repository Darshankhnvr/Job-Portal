# Job Portal 💼

A production-ready full-stack job portal application built with the MERN stack, featuring role-based authentication, job management, and containerized deployment.

## 🎯 Features

- **Multi-Role Authentication**: Admin, Employer, and Job Seeker roles with JWT-based security
- **Job Management**: Create, edit, delete, and list job postings with detailed filtering
- **Application Tracking**: Track job applications with status updates and applicant management
- **Admin Dashboard**: Complete admin panel for user and job management
- **File Upload**: Resume and job posting document uploads with Multer
- **Security**: Helmet, Bcrypt password hashing, Arcjet DDoS protection
- **Testing**: Comprehensive unit tests with Jest and Supertest
- **Docker Ready**: Multi-stage Docker builds with Docker Compose for local development
- **Azure Deployment**: Production-ready deployment configuration
- **Structured Logging**: Winston logger with request tracking

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, Bcrypt, Arcjet
- **Testing**: Jest, Supertest
- **Logging**: Winston, Morgan
- **File Upload**: Multer
- **Containerization**: Docker

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Linting**: ESLint
- **Deployment**: Nginx

### DevOps
- **Containerization**: Docker, Docker Compose
- **Cloud**: Microsoft Azure
- **CI/CD**: Docker Hub compatible

## 📋 Project Structure

```
Job Portal/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth, error handling
│   │   ├── config/             # Database, logging config
│   │   └── utils/              # Helper functions
│   ├── tests/                  # Jest test files
│   ├── Dockerfile              # Production image
│   └── package.json
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route pages
│   │   ├── services/           # API services
│   │   ├── context/            # React context (auth)
│   │   └── utils/              # Helper functions
│   ├── Dockerfile              # Production image
│   ├── nginx.conf              # Nginx config
│   └── package.json
│
├── docker-compose.yml          # Local development stack
├── DEPLOYMENT.md               # Azure deployment guide
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB (local or Atlas)
- Docker & Docker Compose (for containerized setup)

### Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

**Backend** (`backend/.env`):
```env
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your-super-secret-jwt-key-change-this
ARCJET_KEY=your-arcjet-key
CORS_ORIGIN=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:3000/api
```

### Local Setup (Without Docker)

1. **Clone and install dependencies**:
```bash
cd backend && npm install
cd ../frontend && npm install
```

2. **Start MongoDB**:
```bash
mongod
```

3. **Start backend** (from `backend/` directory):
```bash
npm run dev
```

4. **Start frontend** (from `frontend/` directory, new terminal):
```bash
npm run dev
```

5. **Access the application**:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API: http://localhost:3000/api

### Docker Setup (Recommended)

1. **Start all services**:
```bash
docker-compose up --build
```

2. **Access the application**:
- Frontend: http://localhost
- Backend: http://localhost:3000
- MongoDB: localhost:27017

3. **Stop services**:
```bash
docker-compose down
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (Employer/Admin)
- `PUT /api/jobs/:id` - Update job (Employer/Admin)
- `DELETE /api/jobs/:id` - Delete job (Employer/Admin)

### Applications
- `GET /api/applications` - Get user applications
- `POST /api/applications` - Apply for job
- `GET /api/jobs/:id/applicants` - Get job applicants (Employer/Admin)
- `PATCH /api/applications/:id/status` - Update application status

### Admin
- `GET /api/admin/users` - List all users (Admin only)
- `GET /api/admin/jobs` - List all jobs (Admin only)

## 🧪 Testing

Run the test suite:

```bash
# Backend tests
cd backend && npm test

# Frontend linting
cd frontend && npm run lint
```

Tests include:
- User authentication and JWT validation
- Job CRUD operations
- Application workflow
- Authorization and role-based access control
- Error handling

## 🐳 Docker Deployment

### Build Images

```bash
# Backend
cd backend
docker build -t <username>/job-portal-backend:latest .

# Frontend
cd ../frontend
docker build -t <username>/job-portal-frontend:latest .
```

### Push to Docker Hub

```bash
docker login
docker push <username>/job-portal-backend:latest
docker push <username>/job-portal-frontend:latest
```

## ☁️ Azure Deployment

For complete Azure deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

Quick overview:
1. Create Azure Container Registry
2. Push Docker images
3. Deploy Web Apps
4. Configure environment variables
5. Enable continuous deployment

**Estimated deployment time**: 2-3 hours  
**Estimated monthly cost**: $13 (production) or $0 (free tier)

## 📚 Documentation

- [Docker Setup Guide](./README-DOCKER.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Quick Reference](./QUICK-REFERENCE.md)

## 🔒 Security Features

- ✅ JWT-based authentication with expiration
- ✅ Password hashing with Bcrypt
- ✅ Role-based access control (RBAC)
- ✅ Helmet.js for HTTP header security
- ✅ Arcjet DDoS protection
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Error handling without sensitive data exposure

## 📊 User Roles

1. **Admin**: Full system access, user management, job moderation
2. **Employer**: Create/manage job postings, view applicants, track applications
3. **Job Seeker**: Browse jobs, apply for positions, track applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

Created as a production-ready portfolio project demonstrating full-stack development with MERN, containerization, and cloud deployment.

## 🔗 Links

- [GitHub Repository](https://github.com/Darshankhnvr/Job-Portal)
- [Live Demo](https://your-deployed-url.azurewebsites.net) (update after deployment)
- [Docker Hub](https://hub.docker.com) (add your images after deployment)

---

**Status**: ✅ Production Ready | Fully Containerized | Ready for Deployment

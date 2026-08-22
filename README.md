Dayflow — HR Management System
Overview

Dayflow is a role-based Human Resource Management System designed to manage employees, attendance, leave, salary, and payroll through a single web application.

The application provides separate experiences for:

Admin / HR
Employees

The frontend is built with React + Vite, while the backend uses Node.js + Express + MongoDB.

Features
🔐 Authentication
Secure login using JWT
Role-based authentication
Protected routes
Admin/HR access
Employee access
Logout
👨‍💼 Admin / HR
Dashboard
Employee management
Employee search
Employee details
Attendance management
Leave management
Approve/reject leave requests
Salary management
Payroll management
👤 Employee
Personal dashboard
Profile
Attendance
Check-in / Check-out
Leave application
Leave history
Salary information
Payroll information
Technology Stack
Frontend
React.js
Vite
React Router
Axios
Lucide React
CSS
Responsive UI
Backend
Node.js
Express.js
JWT
REST APIs
MongoDB
Mongoose
Development Tools
Git
GitHub
Postman
VS Code
Project Structure
dayflow/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── layouts/
    │   ├── api/
    │   ├── context/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    │
    ├── index.html
    ├── package.json
    └── .env
Installation
1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd dayflow
Backend Setup
cd backend
npm install

Create a .env file:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

Start the backend:

npm run dev

Backend:

http://localhost:5000
Frontend Setup

Open another terminal:

cd frontend
npm install

Create .env:

VITE_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

Frontend:

http://localhost:5173
Authentication Flow
User
  ↓
Login Page
  ↓
POST /api/auth/login
  ↓
Backend validates credentials
  ↓
JWT Token
  ↓
Frontend stores token
  ↓
Role is identified
  ↓
 ┌──────────────────┐
 │                  │
Admin/HR          Employee
 │                  │
 ↓                  ↓
Admin Dashboard   Employee Dashboard
User Roles
Admin / HR

Can manage:

Employees
Attendance
Leaves
Salary
Payroll
Dashboard
Employee

Can access:

Dashboard
Profile
Attendance
Leaves
Salary
Payroll
API

The frontend communicates with the backend through REST APIs.

Base URL:

http://localhost:5000/api

Example:

POST   /api/auth/login

GET    /api/employees

GET    /api/employees/:id

PUT    /api/employees/:id

GET    /api/dashboard/admin

GET    /api/dashboard/employee
Environment Variables
Frontend
VITE_API_URL=http://localhost:5000/api
Backend
PORT=5000
MONGODB_URI=
JWT_SECRET=
FRONTEND_URL=http://localhost:5173

Never commit .env files to GitHub.

Add:

.env
node_modules/
dist/

to .gitignore.

Git Workflow

After completing each feature:

git status
git add .
git commit -m "feat: add authentication"
git push origin main

Recommended commits:

feat: setup backend
feat: add authentication
feat: add role based authorization
feat: add employee management
feat: add attendance management
feat: add leave management
feat: add salary management
feat: add payroll management
feat: add admin dashboard
feat: add employee dashboard
feat: add frontend authentication
feat: add responsive dashboard UI
style: improve application UI
fix: resolve frontend backend integration
Running the Complete Application

Start MongoDB first.

Then run the backend:

cd backend
npm run dev

In another terminal:

cd frontend
npm run dev

Open:

http://localhost:5173
Security

The application uses:

JWT authentication
Password hashing
Protected API routes
Role-based authorization
Environment variables for secrets
CORS configuration
Future Improvements

Potential production enhancements:

Email notifications
Forgot/reset password
Employee onboarding
Document management
Performance reviews
Payslip PDF generation
Advanced analytics
Audit logs
Notifications
Search and filtering
Dark mode
Cloud deployment
Automated tests

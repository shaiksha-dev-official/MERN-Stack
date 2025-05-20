# MERN-Stack
# WorkBuddy Application

**WorkBuddy** is a full-stack Employee-Manager Interaction Platform designed to enhance communication, optimize task management, and streamline administrative workflows between employees and managers. This project was built with the goal of digitizing daily operations in a company by providing an intuitive dashboard for both managers and employees, enabling better coordination, performance tracking, and productivity.

---

## 🌟 Features

* 🔐 **Authentication & Authorization**

  * Secure login & registration using JWT tokens
  * Role-based access (admin, employee)

* 🧑‍💼 **User Dashboard**

  * View assigned tasks
  * Submit task progress reports
  * Communicate with managers
  * Receive notifications and announcements

* 👨‍💼 **Admin Dashboard**

  * Add/manage employees
  * Assign tasks to employees
  * Track employee performance
  * View reports and statistics

* 📅 **Scrum Board Integration**

  * Visual task board (To Do, In Progress, Done)
  * Drag-and-drop task management

* 💬 **Interaction Module**

  * Internal messaging/chat interface
  * Notifications for task updates or announcements

* 📊 **Analytics and Reports**

  * Employee productivity metrics
  * Task completion charts
  * Attendance and punctuality logs

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Bootstrap
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Dev Tools

* Visual Studio Code
* Git & GitHub
* Postman
* MongoDB Compass
* npm (Node Package Manager)

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your system:

* Node.js (v16+)
* MongoDB (local or MongoDB Atlas)
* npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/workbuddy-app.git
cd workbuddy-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Start the frontend React app:

```bash
npm start
```

---

## 🌐 API Endpoints

### Auth

* `POST /api/auth/register` - Register new user
* `POST /api/auth/login` - Login user

### Admin

* `GET /api/admin/employees` - List employees
* `POST /api/admin/task` - Assign task
* `GET /api/admin/reports` - View performance reports

### User

* `GET /api/user/tasks` - View assigned tasks
* `PUT /api/user/task/:id` - Update task progress

---

## ⚙️ Deployment

Deploy frontend and backend separately:

### Frontend

* Vercel / Netlify

### Backend

* Render / Railway / Heroku

### Database

* MongoDB Atlas (cloud-hosted MongoDB)

---

## 🧪 Testing

Use Postman or Insomnia to test API routes manually. Automated test coverage can be added with:

* Jest (for backend)
* React Testing Library (for frontend)

---

## 📸 Screenshots

> *Screenshots of the dashboard, task board, login page, etc.*

---


## 📬 Contact

**Shaik Sha**
📧 Email: [shaiksha.github@gmail.com](mailto:shaiksha.github@gmail.com)
🔗 GitHub: [shaiksha-github](https://github.com/shaiksha-github)

> Feel free to contribute, raise issues, or give feedback!


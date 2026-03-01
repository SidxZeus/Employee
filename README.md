# 🚀 TaskFlow Pro - Modern Task Management System

![TaskFlow Pro](https://img.shields.io/badge/TaskFlow-Pro-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-cyan)
![Firebase](https://img.shields.io/badge/Firebase-11.3.1-orange)

**A sleek, modern task management application built with React, Tailwind CSS, and Firebase**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## ✨ Features

### 🔐 **Authentication System**
- **Dual Role Support**: Admin and Employee login systems
- **Secure Authentication**: Integrated with Firebase Authentication
- **Session Management**: Persistent login state with local caching
- **Role-based Access**: Different dashboards for different user types

### 📊 **Admin Dashboard**
- **Task Creation**: Create and assign tasks to employees and save to Firestore
- **Employee Management**: View and manage employee data synced real-time
- **Task Overview**: Monitor all tasks across the organization
- **Real-time Updates**: Instant task status changes via Firebase real-time listeners

### 👥 **Employee Dashboard**
- **Task Management**: View assigned tasks with different statuses
- **Task Categories**: New, Active, Completed, and Failed task views
- **Task Actions**: Accept, complete, or mark tasks as failed
- **Progress Tracking**: Real-time task count updates

### 🎯 **Task Management**
- **Task Creation**: Rich task creation with title, description, date, and category
- **Task Assignment**: Assign tasks to specific employees
- **Status Tracking**: Multiple task statuses (New, Active, Completed, Failed)
- **Category System**: Organize tasks by categories (Design, Development, etc.)

### 🎨 **Modern UI/UX**
- **Dark Theme**: Sleek dark interface for better user experience
- **Responsive Design**: Works seamlessly on all device sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Professional Layout**: Clean and intuitive user interface

---

## 🎥 Demo

### Login Interface
- **Admin Login**: `admin@me.com` / `123`
- **Employee Login**: Use registered employee credentials

### Key Features Demo
- Create new tasks with detailed information (synced to Firestore)
- Assign tasks to specific employees
- Track task progress through different statuses
- Real-time dashboard updates across all users

---

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow-pro.git
   cd taskflow-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase Environment**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Seed Database (Initial Setup)**
   Run the seeding script to populate Firestore with initial admin and employee data:
   ```bash
   node seed-firestore.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🚀 Usage

### For Administrators

1. **Login as Admin**
   - Email: `admin@me.com`
   - Password: `123`

2. **Create Tasks**
   - Navigate to the task creation form
   - Fill in task details (title, description, date, category)
   - Assign to specific employees
   - Submit to create the task

3. **Monitor Progress**
   - View all tasks across the organization
   - Track employee performance
   - Manage task assignments

### For Employees

1. **Login with Employee Credentials**
   - Use your registered email and password

2. **View Assigned Tasks**
   - See all tasks assigned to you
   - Filter by task status (New, Active, Completed, Failed)

3. **Manage Tasks**
   - Accept new tasks
   - Mark tasks as completed
   - Report failed tasks with reasons

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── Login.jsx          # Authentication component
│   ├── Dashboard/
│   │   ├── AdminDashboard.jsx # Admin dashboard
│   │   └── EmployeeDashboard.jsx # Employee dashboard
│   ├── TaskList/
│   │   ├── TaskList.jsx       # Main task list component
│   │   ├── NewTask.jsx        # New task display
│   │   ├── AcceptTask.jsx     # Active task display
│   │   ├── CompleteTask.jsx   # Completed task display
│   │   └── FailedTask.jsx     # Failed task display
│   └── other/
│       ├── CreateTask.jsx     # Task creation form
│       ├── Header.jsx         # Navigation header
│       └── TaskListNumbers.jsx # Task count display
├── context/
│   └── AuthProvider.jsx       # Authentication & Firestore context
├── utils/
│   └── firebase.js            # Firebase initialization and config
├── App.jsx                    # Main application component
└── main.jsx                   # Application entry point
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern JavaScript library for building user interfaces
- **Vite 6.3.5** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing tool

### Backend & Database
- **Firebase 11.3.1** - Backend-as-a-service platform
- **Cloud Firestore** - NoSQL cloud database for real-time task sync
- **Firebase Authentication** - Secure user identity management

### Development Tools
- **ESLint 9.25.0** - Code linting and formatting
- **TypeScript Support** - Type definitions for React
- **Hot Module Replacement** - Instant development updates

### Key Features
- **Component-based Architecture** - Modular and maintainable code
- **Context API** - State management for authentication and live data
- **Real-time Synchronization** - Firestore listeners for instant updates
- **Responsive Design** - Mobile-first approach

---

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (#10b981)
- **Background**: Dark (#1c1c1c)
- **Text**: White and Gray variations
- **Accents**: Blue, Red for different task statuses

### Typography
- **Headings**: Semibold weights for hierarchy
- **Body Text**: Regular weights for readability
- **Interactive Elements**: Hover states and transitions

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface for small screens

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Open Source Community** - For inspiration and support

---

## 📞 Support

If you have any questions or need support:

- **Issues**: [GitHub Issues](https://github.com/yourusername/taskflow-pro/issues)
- **Email**: support@taskflow-pro.com
- **Documentation**: [Wiki](https://github.com/yourusername/taskflow-pro/wiki)

---

<div align="center">

**Made with ❤️ by the TaskFlow Pro Team**

[⬆ Back to Top](#-taskflow-pro---modern-task-management-system)

</div>

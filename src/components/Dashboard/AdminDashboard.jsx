import React, { useState, useContext, useEffect } from "react";
import Header from "../other/Header";
import CreateTask from "../other/CreateTask";
import AddEmployee from "../other/AddEmployee";
import AllTask from "../other/AllTask";
import { AuthContext } from "../../context/AuthProvider";

const AdminDashboard = (props) => {
  const [userData] = useContext(AuthContext);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    activeTasks: 0,
    completedTasks: 0
  });

  useEffect(() => {
    if (userData) {
      const totalEmployees = userData.length;
      const totalTasks = userData.reduce((sum, emp) =>
        sum + (emp.tasksNumbers?.newTask || 0) +
        (emp.tasksNumbers?.active || 0) +
        (emp.tasksNumbers?.completed || 0) +
        (emp.tasksNumbers?.failed || 0), 0
      );
      const activeTasks = userData.reduce((sum, emp) =>
        sum + (emp.tasksNumbers?.active || 0), 0
      );
      const completedTasks = userData.reduce((sum, emp) =>
        sum + (emp.tasksNumbers?.completed || 0), 0
      );

      setStats({
        totalEmployees,
        totalTasks,
        activeTasks,
        completedTasks
      });
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <Header changeUser={props.changeUser} />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-purple-200 text-lg">
            Manage your team and track task progress from your dashboard
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Employees */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Total Employees</p>
                <p className="text-3xl font-bold text-white">{stats.totalEmployees}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Tasks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300 animate-slide-up animation-delay-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.totalTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Tasks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300 animate-slide-up animation-delay-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Active Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.activeTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300 animate-slide-up animation-delay-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Completed Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.completedTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 animate-fade-in animation-delay-400">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { setShowCreateTask(!showCreateTask); setShowAddEmployee(false); }}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${showCreateTask ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {showCreateTask ? 'Hide Task Creator' : 'Create New Task'}
              </button>

              <button
                onClick={() => { setShowAddEmployee(!showAddEmployee); setShowCreateTask(false); }}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border border-white/20 ${showAddEmployee ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                {showAddEmployee ? 'Hide Add Employee' : 'Add Employee'}
              </button>

              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 border border-white/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Create Task Section */}
        {showCreateTask && (
          <div className="mb-8 animate-slide-down">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Create New Task</h2>
                <p className="text-purple-100 text-sm">Assign tasks to your team members</p>
              </div>
              <div className="p-6">
                <CreateTask />
              </div>
            </div>
          </div>
        )}

        {/* Add Employee Section */}
        {showAddEmployee && (
          <div className="mb-8 animate-slide-down">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Register New Employee</h2>
                <p className="text-purple-100 text-sm">Add a new team member to the system</p>
              </div>
              <div className="p-6">
                <AddEmployee />
              </div>
            </div>
          </div>
        )}

        {/* Task Overview */}
        <div className="animate-fade-in animation-delay-500">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Team Task Overview</h2>
              <p className="text-gray-300 text-sm">Monitor task distribution across your team</p>
            </div>
            <div className="p-6">
              <AllTask />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

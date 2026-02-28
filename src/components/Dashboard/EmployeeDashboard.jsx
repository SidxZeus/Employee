import React, { useState, useContext } from 'react'
import Header from '../other/Header'
import TaskListNummbers from '../other/TaskListNummbers'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from "../../context/AuthProvider";

const EmployeeDashboard = (props) => {
  const [userData] = useContext(AuthContext);
  // Find the latest employee data from context by email
  const employee = userData?.find(e => e.email === props.data.email) || props.data;

  const stats = {
    newTasks: employee?.taskNumbers?.newTask || 0,
    activeTasks: employee?.taskNumbers?.active || 0,
    completedTasks: employee?.taskNumbers?.completed || 0,
    failedTasks: employee?.taskNumbers?.failed || 0
  };

  const totalTasks = stats.newTasks + stats.activeTasks + stats.completedTasks + stats.failedTasks;
  const completionRate = totalTasks > 0 ? Math.round((stats.completedTasks / totalTasks) * 100) : 0;

  const [filterType, setFilterType] = useState('active'); // 'active' or 'all'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <Header changeUser={props.changeUser} data={props.data} />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {props.data?.firstName || 'Employee'}! 👋
          </h1>
          <p className="text-purple-200 text-lg">
            Here's your task overview and current progress
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* New Tasks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">New Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.newTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Tasks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
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
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-white">{stats.completedTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Failed Tasks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Failed</p>
                <p className="text-3xl font-bold text-white">{stats.failedTasks}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Your Progress</h2>
              <span className="text-purple-200 text-sm font-medium">
                {completionRate}% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{totalTasks}</p>
                <p className="text-purple-200 text-sm">Total Tasks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{stats.completedTasks}</p>
                <p className="text-purple-200 text-sm">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">{stats.activeTasks}</p>
                <p className="text-purple-200 text-sm">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{stats.failedTasks}</p>
                <p className="text-purple-200 text-sm">Failed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setFilterType('active')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium ${filterType === 'active' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Accept New Tasks
              </button>

              <button
                onClick={() => setFilterType('all')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium border border-white/20 ${filterType === 'all' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View All Tasks
              </button>

              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium border border-white/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Task Lists */}
        <div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
              <h2 className="text-xl font-bold text-white">{filterType === 'all' ? 'All Tasks' : 'Your Tasks'}</h2>
              <p className="text-gray-300 text-sm">Manage and track your assigned tasks</p>
            </div>
            <div className="p-6">
              <TaskList data={employee} filterType={filterType} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard

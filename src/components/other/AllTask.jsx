import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
  const [userData] = useContext(AuthContext)

  return (
    <div className="overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-xl overflow-hidden">
        <div className="grid grid-cols-5 gap-6 p-6 text-white font-semibold">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="min-w-0">Employee Name</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
            <span className="min-w-0">New Tasks</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <span className="min-w-0">Active Tasks</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
            <span className="min-w-0">Completed</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="min-w-0">Failed</span>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {userData && userData.map((elem, idx) => (
          <div 
            key={idx} 
            className="grid grid-cols-5 gap-6 p-6 border-b border-white/10 hover:bg-white/5 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Employee Name Column */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {elem.firstName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white truncate">{elem.firstName || 'Unknown'}</p>
                <p className="text-sm text-gray-400 truncate">{elem.email || 'No email'}</p>
              </div>
            </div>

            {/* New Tasks Column */}
            <div className="flex items-center justify-center">
              <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {elem.tasksNumbers?.newTask || 0}
              </span>
            </div>

            {/* Active Tasks Column */}
            <div className="flex items-center justify-center">
              <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {elem.tasksNumbers?.active || 0}
              </span>
            </div>

            {/* Completed Tasks Column */}
            <div className="flex items-center justify-center">
              <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {elem.tasksNumbers?.completed || 0}
              </span>
            </div>

            {/* Failed Tasks Column */}
            <div className="flex items-center justify-center">
              <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {elem.tasksNumbers?.failed || 0}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(!userData || userData.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">No employees found</h3>
          <p className="text-gray-400">Add some employees to get started with task management.</p>
        </div>
      )}

      {/* Table Summary */}
      {userData && userData.length > 0 && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-b-xl p-6 border-t border-white/10">
          <div className="grid grid-cols-5 gap-6 text-white">
            <div className="flex items-center">
              <span className="font-semibold">Total ({userData.length} employees)</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {userData.reduce((sum, emp) => sum + (emp.tasksNumbers?.newTask || 0), 0)}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {userData.reduce((sum, emp) => sum + (emp.tasksNumbers?.active || 0), 0)}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {userData.reduce((sum, emp) => sum + (emp.tasksNumbers?.completed || 0), 0)}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium min-w-[60px] text-center">
                {userData.reduce((sum, emp) => sum + (emp.tasksNumbers?.failed || 0), 0)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllTask

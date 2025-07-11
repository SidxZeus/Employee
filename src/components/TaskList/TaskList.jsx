import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const statusMap = {
  active: {
    label: "Active",
    color: "from-yellow-500 to-yellow-600",
    icon: (
      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  newTask: {
    label: "New",
    color: "from-blue-500 to-blue-600",
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    )
  },
  completed: {
    label: "Completed",
    color: "from-green-500 to-green-600",
    icon: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  failed: {
    label: "Failed",
    color: "from-red-500 to-red-600",
    icon: (
      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }
};

const getStatus = (task) => {
  if (task.active) return "active";
  if (task.newTask) return "newTask";
  if (task.completed) return "completed";
  if (task.failed) return "failed";
  return "unknown";
};

const TaskList = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const tasks = data.tasks || [];

  const handleMarkCompleted = (taskIndex) => {
    if (!userData) return;
    // Find the employee in userData
    const updatedUserData = userData.map((emp) => {
      if (emp.email === data.email) {
        const updatedTasks = emp.tasks.map((task, idx) => {
          if (idx === taskIndex) {
            return {
              ...task,
              active: false,
              completed: true,
              newTask: false,
              failed: false,
            };
          }
          return task;
        });
        // Update taskNumbers
        const updatedTaskNumbers = {
          ...emp.tasksNumbers,
          active: Math.max(0, (emp.tasksNumbers.active || 0) - 1),
          completed: (emp.tasksNumbers.completed || 0) + 1,
        };
        return {
          ...emp,
          tasks: updatedTasks,
          tasksNumbers: updatedTaskNumbers,
        };
      }
      return emp;
    });
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));
  };

  const handleMarkFailed = (taskIndex) => {
    if (!userData) return;
    // Find the employee in userData
    const updatedUserData = userData.map((emp) => {
      if (emp.email === data.email) {
        const updatedTasks = emp.tasks.map((task, idx) => {
          if (idx === taskIndex) {
            return {
              ...task,
              active: false,
              failed: true,
              newTask: false,
              completed: false,
            };
          }
          return task;
        });
        // Update taskNumbers
        const updatedTaskNumbers = {
          ...emp.tasksNumbers,
          active: Math.max(0, (emp.tasksNumbers.active || 0) - 1),
          failed: (emp.tasksNumbers.failed || 0) + 1,
        };
        return {
          ...emp,
          tasks: updatedTasks,
          tasksNumbers: updatedTaskNumbers,
        };
      }
      return emp;
    });
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));
  };

  if (!tasks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-16 h-16 text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-lg font-medium text-purple-200 mb-2">No tasks assigned</h3>
        <p className="text-purple-400">You have no tasks at the moment. Enjoy your free time!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tasks.map((task, idx) => {
        const status = getStatus(task);
        const statusInfo = statusMap[status] || {};
        const isActive = status === "active";
        
        return (
          <div
            key={idx}
            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:scale-[1.03] transition-all duration-300 flex flex-col min-h-[220px] animate-fade-in`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${statusInfo.color || 'from-gray-500 to-gray-700'} text-white text-xs font-semibold shadow-md`}> 
              {statusInfo.icon}
              <span>{statusInfo.label || 'Unknown'}</span>
            </div>
            
            {/* Task Content */}
            <h2 className="text-xl font-bold text-white mb-2 truncate">{task.title}</h2>
            <p className="text-purple-200 text-sm mb-4 line-clamp-3">{task.description}</p>
            
            <div className="flex-1"></div>
            
            {/* Category and Date */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-purple-300 bg-white/10 px-3 py-1 rounded-full">
                {task.category}
              </span>
              <span className="text-xs text-purple-300 bg-white/10 px-3 py-1 rounded-full">
                {task.date}
              </span>
            </div>
            
            {/* Action Buttons for Active Tasks */}
            {isActive && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleMarkCompleted(idx)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                   Completed
                </button>
                <button
                  onClick={() => handleMarkFailed(idx)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                   Failed
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;

import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

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

const getDeadlineInfo = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(dateStr);
  deadline.setHours(0, 0, 0, 0);
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      label: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20 border-red-500/30',
      icon: '🔴',
      isOverdue: true,
      daysLeft: diffDays
    };
  } else if (diffDays === 0) {
    return {
      label: 'Due Today!',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20 border-yellow-500/30',
      icon: '🟡',
      isOverdue: false,
      daysLeft: 0
    };
  } else if (diffDays <= 3) {
    return {
      label: `${diffDays} day${diffDays > 1 ? 's' : ''} left`,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20 border-orange-500/30',
      icon: '🟠',
      isOverdue: false,
      daysLeft: diffDays
    };
  } else {
    return {
      label: `${diffDays} days left`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20 border-green-500/30',
      icon: '🟢',
      isOverdue: false,
      daysLeft: diffDays
    };
  }
};

const TaskList = ({ data, filterType = 'all' }) => {
  const [userData] = useContext(AuthContext);
  const tasks = data.tasks || [];

  const handleMarkCompleted = async (taskIndex) => {
    if (!userData || !data) return;

    try {
      // Find the employee in userData
      const currentEmployee = userData.find(emp => emp.email === data.email);
      if (!currentEmployee) return;

      const taskToUpdate = currentEmployee.tasks[taskIndex];
      const wasActive = taskToUpdate.active;
      const wasNew = taskToUpdate.newTask;

      const updatedTasks = currentEmployee.tasks.map((task, idx) => {
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
        ...(currentEmployee.taskNumbers || currentEmployee.tasksNumbers || { active: 0, newTask: 0, completed: 0, failed: 0 }),
      };

      if (wasActive) updatedTaskNumbers.active = Math.max(0, (updatedTaskNumbers.active || 0) - 1);
      if (wasNew) updatedTaskNumbers.newTask = Math.max(0, (updatedTaskNumbers.newTask || 0) - 1);
      updatedTaskNumbers.completed = (updatedTaskNumbers.completed || 0) + 1;

      // Update Firestore document
      const empRef = doc(db, "employees", currentEmployee.id.toString());
      await updateDoc(empRef, {
        tasks: updatedTasks,
        tasksNumbers: updatedTaskNumbers
      });

    } catch (error) {
      console.error("Error updating task completion:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleMarkFailed = async (taskIndex) => {
    if (!userData || !data) return;

    try {
      // Find the employee in userData
      const currentEmployee = userData.find(emp => emp.email === data.email);
      if (!currentEmployee) return;

      const taskToUpdate = currentEmployee.tasks[taskIndex];
      const wasActive = taskToUpdate.active;
      const wasNew = taskToUpdate.newTask;

      const updatedTasks = currentEmployee.tasks.map((task, idx) => {
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
        ...(currentEmployee.taskNumbers || currentEmployee.tasksNumbers || { active: 0, newTask: 0, completed: 0, failed: 0 }),
      };

      if (wasActive) updatedTaskNumbers.active = Math.max(0, (updatedTaskNumbers.active || 0) - 1);
      if (wasNew) updatedTaskNumbers.newTask = Math.max(0, (updatedTaskNumbers.newTask || 0) - 1);
      updatedTaskNumbers.failed = (updatedTaskNumbers.failed || 0) + 1;

      // Update Firestore document
      const empRef = doc(db, "employees", currentEmployee.id.toString());
      await updateDoc(empRef, {
        tasks: updatedTasks,
        tasksNumbers: updatedTaskNumbers
      });

    } catch (error) {
      console.error("Error updating task failure:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const filteredTasks = tasks.map((task, originalIndex) => ({ ...task, originalIndex })).filter((task) => {
    if (filterType === 'active') {
      return task.active || task.newTask;
    }
    return true; // 'all' filter
  });

  if (!filteredTasks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-16 h-16 text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-lg font-medium text-purple-200 mb-2">No tasks found</h3>
        <p className="text-purple-400">There are no tasks matching this filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredTasks.map((task, idx) => {
        const status = getStatus(task);
        const statusInfo = statusMap[status] || {};
        const isActionable = status === "active" || status === "newTask";

        return (
          <div
            key={idx}
            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg flex flex-col min-h-[220px]`}
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-purple-300 bg-white/10 px-3 py-1 rounded-full">
                {task.category}
              </span>
              <span className="text-xs text-purple-300 bg-white/10 px-3 py-1 rounded-full">
                📅 {task.date}
              </span>
            </div>

            {/* Deadline Indicator */}
            {task.date && (() => {
              const deadlineInfo = getDeadlineInfo(task.date);
              if (!deadlineInfo) return null;
              const isFinished = status === 'completed' || status === 'failed';
              if (isFinished) return null;
              return (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${deadlineInfo.bgColor} mb-2 ${deadlineInfo.isOverdue ? 'animate-pulse' : ''}`}>
                  <span>{deadlineInfo.icon}</span>
                  <span className={`text-xs font-semibold ${deadlineInfo.color}`}>
                    {deadlineInfo.label}
                  </span>
                </div>
              );
            })()}

            {/* Action Buttons for Active and New Tasks */}
            {isActionable && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleMarkCompleted(task.originalIndex)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Completed
                </button>
                <button
                  onClick={() => handleMarkFailed(task.originalIndex)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg"
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

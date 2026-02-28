import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { generateTaskDetails } from '../../utils/aiService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const CreateTask = () => {
  const [userData] = useContext(AuthContext);



  const [taskTitle, setTaskTitle] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignTo, setAssignTo] = useState('')
  const [category, setCategory] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleAssignToChange = (e) => {
    setAssignTo(e.target.value)
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (firstName) => {
    setAssignTo(firstName)
    setShowSuggestions(false)
  }

  const filteredEmployees = userData?.filter(emp =>
    emp.firstName.toLowerCase().includes(assignTo.toLowerCase())
  ) || []

  const handleAIGenerate = async (e) => {
    e.preventDefault();
    if (!taskTitle) return alert("Please enter a Task Title first!");

    setIsGenerating(true);
    const aiResult = await generateTaskDetails(taskTitle);

    if (aiResult) {
      setTaskDescription(aiResult.description);
      setCategory(aiResult.category);
    } else {
      alert("Failed to generate task details. Please check your API key or try again.");
    }
    setIsGenerating(false);
    setIsGenerating(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const newtask = ({
      title: taskTitle,           // Changed from taskTitle to title
      date: taskDate,             // Changed from taskDate to date
      category,
      description: taskDescription, // Changed from taskDescription to description
      active: false,
      newTask: true,
      failed: false,
      completed: false
    })

    // Update the task in Firestore instead of localStorage
    try {
      const assignedEmployee = userData.find(emp => emp.firstName === assignTo);
      if (!assignedEmployee) {
        alert("Employee not found!");
        return;
      }

      // Update the tasks array and taskNumbers locally first
      const updatedTasks = [...(assignedEmployee.tasks || []), newtask];
      const updatedTaskNumbers = {
        ...(assignedEmployee.tasksNumbers || { active: 0, newTask: 0, completed: 0, failed: 0 }),
      };
      updatedTaskNumbers.newTask = (updatedTaskNumbers.newTask || 0) + 1;

      // Update Firestore document
      const empRef = doc(db, "employees", assignedEmployee.id.toString());
      await updateDoc(empRef, {
        tasks: updatedTasks,
        tasksNumbers: updatedTaskNumbers
      });

      // Reset Form fields
      setTaskTitle('');
      setCategory('');
      setTaskDate('');
      setTaskDescription('');
      setAssignTo('');

    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-7 rounded">
      <form onSubmit={submitHandler} className="flex w-full flex-wrap items-start justify-between">
        <div className="w-1/2">
          {" "}
          <div>
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
              <div className="flex gap-2 mb-4 w-4/5">
                <input
                  value={taskTitle}
                  onChange={(e) => { setTaskTitle(e.target.value) }}
                  className="text-sm py-1 px-2 flex-grow rounded outline-none bg-transparent border-[1px] border-gray-400"
                  type="text"
                  placeholder="Make a UI design"
                />
                <button
                  onClick={handleAIGenerate}
                  disabled={isGenerating || !taskTitle}
                  className={`text-sm px-3 rounded font-medium transition-colors ${isGenerating || !taskTitle
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20'
                    }`}
                >
                  {isGenerating ? "✨ Thinking..." : "✨ Auto-Fill"}
                </button>
              </div>
            </div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => { setTaskDate(e.target.value) }}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>
          <div className="relative">
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <input
              value={assignTo}
              onChange={handleAssignToChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 focus:border-purple-500 transition-colors"
              type="text"
              placeholder="Assign to (First Name)"
            />
            {showSuggestions && assignTo && filteredEmployees.length > 0 && (
              <ul className="absolute z-10 w-4/5 bg-gray-800 border border-gray-600 rounded mt-[-12px] max-h-40 overflow-y-auto shadow-lg">
                {filteredEmployees.map(emp => (
                  <li
                    key={emp.id}
                    onClick={() => handleSuggestionClick(emp.firstName)}
                    className="px-3 py-2 text-sm text-gray-200 hover:bg-purple-600 cursor-pointer transition-colors"
                  >
                    {emp.firstName} {emp.name && emp.name !== emp.firstName ? `(${emp.name})` : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => { setCategory(e.target.value) }}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Design, Dev"
            />
          </div>
        </div>
        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => { setTaskDescription(e.target.value) }}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask

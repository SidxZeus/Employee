import React from 'react'
import Header from '../other/Header'
import TaskListNummbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = ({data}) => {
  return (
    <div className="p-10 bg-[#1c1c1c] h-screen">
      {<Header data={data} />}
      {<TaskListNummbers data={data}/>}
      {<TaskList data={data}/>}
    </div>
  )
}

export default EmployeeDashboard

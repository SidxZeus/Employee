import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
const TaskList = ({data}) => {
  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto justify-start flex-nowrap flex gap-5 items-center w-full mt-10 py-5"
    >
      {data.tasks.map((elem, idx)=>{
        if(elem.active){
          return <AcceptTask key={idx}/>
        }
        if(elem.newTask){
          return <NewTask key={idx}/>
        }
        if(elem.completed){
          return <CompleteTask key={idx}/>
        }
        if(elem.failed){
          return <FailedTask key={idx}/>
        }
        
      })}
     
    </div>
  );
};

export default TaskList;

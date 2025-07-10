import React from 'react'

const NewTask = ({data}) => {
  return (
    <div className=" p-5 bg-blue-300 w-[300px] rounded-xl h-full flex-shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="bg-red-600 px-3 py-1 text-sm rounded">{data.category}</h3>
          <h4 className="text-sm">{data.date}</h4>
        </div>
        <h2 className="mt-5 font-semibold text-2xl">{data.title}</h2>
        <p className="text-sm mt-2">
          {data.description}
        </p>
        <div className='mt-4'>
            <button className='bg-blue-400 rounded py-1 px-2 text-sm'>Accept Task</button>
        </div>
      </div>
)};

export default NewTask

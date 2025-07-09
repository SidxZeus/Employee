import React from 'react'

const FailedTask = () => {
  return (
    <div className=" p-5 bg-pink-300 w-[300px] rounded-xl h-full flex-shrink-0">
    <div className="flex justify-between items-center">
      <h3 className="bg-red-600 px-3 py-1 text-sm rounded">High</h3>
      <h4 className="text-sm">20 feb 2024</h4>
    </div>
    <h2 className="mt-5 font-semibold text-2xl">Make a Youtube Video</h2>
    <p className="text-sm mt-2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere nobis
      a, tempore rerum veniam culpa?
    </p>
    <div className='mt-2'>
            <button className='w-full bg-purple-400 rounded py-1 px-2 text-sm'>Failed Task</button>
        </div>
  </div>
  )
}

export default FailedTask

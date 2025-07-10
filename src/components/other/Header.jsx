import React from 'react'

const Header = (props) => {
  // const [username, setusername] = useState('')

  // if(data){
  //   setusername('Admin')
  // }else{
  //   setusername(data.firstName)
  // }

  const loggedUser = () => {
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
    // window.location.reload()
  }
  return (
    <div className="flex items-end justify-between">
      <h1 className='text-2xl font-semibold'>Hello, <br/> <span className='text-3xl font-semibold'>username</span>  </h1>
      <button onClick={loggedUser} className='bg-red-500 text-white px-5 text-lg font-medium py-2 rounded-sm'>
        Logout
      </button>
    </div>
  )
}

export default Header

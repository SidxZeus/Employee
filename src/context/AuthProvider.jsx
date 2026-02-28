import React, { createContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/LocalStorage'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  //  localStorage.clear()
  const [UserData, setUserData] = useState(null)
  useEffect(() => {
    setLocalStorage()
    const { employees } = getLocalStorage()
    setUserData(employees)

  }, [])


  return (
    <div>
      <AuthContext.Provider value={[UserData, setUserData]}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider

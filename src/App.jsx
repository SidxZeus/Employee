import React, { useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/LocalStorage";

const App = () => {
  const [user, setUser] = useState(null);
  const handleLogin = (email, password) => {
    if (email == "admin@me.com" && password == "123") {
      console.log("This is admin");
    } else if (email == "user@me.com" && password == "123") {
      console.log("This is user");
    } 
    else {
      alert("Invalid credentials, please try again.");
    }
  };
  handleLogin("user@me.com", 123);
  // Example usage (remove or adjust as needed)
  // handleLogin('admin@me.com', '123')

  // useEffect(() => {
  //   // setLocalStorage()
  //   getLocalStorage()
  // },[])

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {/* {<EmployeeDashboard/>} */}
      {/* <AdminDashboard/> */}
    </>
  );
};

export default App;

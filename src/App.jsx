import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./utils/LocalStorage";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setloggedInUserData] = useState(null);
  const [userData,setUserData] = useContext(AuthContext);

  useEffect(()=>{
    const loggedInUser = localStorage.getItem("loggedInUser");
    if(loggedInUser){
      const userData = JSON.parse(loggedInUser);
      setUser({ role: userData.role });
      
      // For employees, use the data property; for admin, use the whole object
      if (userData.role === "employee" && userData.data) {
        setloggedInUserData(userData.data);
      } else {
        setloggedInUserData(userData);
      }
    }
  },[])

  const handleLogin = (email, password) => {
    if (email === "admin@me.com" && password === "123") {
      setUser({ role: "admin" });
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser({ role: "employee" });
        setloggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee})
        );
      }
    } else {
      alert("Invalid credentials, please try again.");
    }
  };
  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}
      {user && user.role === "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user && user.role === "employee" ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;

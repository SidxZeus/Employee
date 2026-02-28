import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { admin as adminArray } from "./utils/LocalStorage";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setloggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser({ role: userData.role });

      // For employees, use the data property; for admin, use the whole object
      if (userData.role === "employee" && userData.data) {
        setloggedInUserData(userData.data);
      } else {
        setloggedInUserData(userData);
      }
    }
  }, [])

  const handleLogin = (email, password) => {
    const adminUser = adminArray.find(
      (a) => a.email === email && a.password === password
    );
    if (adminUser) {
      setUser({ role: "admin" });
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", data: adminUser }));
      return;
    }
    if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        setUser({ role: "employee" });
        setloggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
        return;
      }
    }
    alert("Invalid credentials, please try again.");
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

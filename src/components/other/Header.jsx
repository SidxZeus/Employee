import React, { useState, useEffect } from "react";

const Header = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Get user info from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setUserInfo(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("employees");

    // Update parent component
    props.changeUser(null);

    // Optional: Show logout message
    // You can add a toast notification here
  };

  const getUserDisplayName = () => {
    if (!userInfo) return "User";

    if (userInfo.role === "admin") {
      return "Administrator";
    }

    return userInfo.data?.firstName || userInfo.firstName || "User";
  };

  const getUserRole = () => {
    if (!userInfo) return "Unknown";

    if (userInfo.role === "admin") {
      return "System Administrator";
    }

    return "Employee";
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 mb-8">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Toll No, Customer Support, Brand */}
          <div className="flex items-center space-x-8">
            {/* Toll No and Customer Support */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-200 font-medium">Toll No</a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-200 font-medium">Customer Support</a>
            </div>
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TaskFlow Pro</h1>
                <p className="text-xs text-purple-200">
                  Task Management System
                </p>
              </div>
            </div>
          </div>

          {/* Right side - My Orders, Track Your Order, My Account, User Profile */}
          <div className="flex items-center space-x-4">
            {/* New Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-200 font-medium">My Orders</a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-200 font-medium">Track Your Order</a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-200 font-medium">My Account</a>
            </nav>
            {/* Notifications */}
            <button className="relative p-2 text-purple-200 hover:text-white transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 004 6v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-1.81 1.19z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-white font-medium">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-purple-200">{getUserRole()}</p>
                </div>
                <svg
                  className={`w-4 h-4 text-purple-200 transition-transform duration-200 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl z-[999] animate-slide-down"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-white font-medium">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-purple-200">{getUserRole()}</p>
                    </div>

                    <a
                      href="#"
                      className="block px-4 py-2 text-purple-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span>Profile</span>
                      </div>
                    </a>

                    <a
                      href="#"
                      className="block px-4 py-2 text-purple-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>Settings</span>
                      </div>
                    </a>

                    <div className="border-t border-white/10 mt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Logout</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default Header;

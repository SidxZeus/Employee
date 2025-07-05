import React, { useState } from "react";

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 border-emerald-600 p-20 rounded-xl">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
            value={email}
            onChange={(e) => {
                setemail(e.target.value);
            }}
            required
            className="border-2 border-emerald-600 text-lg text-white outline-none placeholder:text-gray-400 bg-transparent py-2 px-6 rounded-full"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => {
                setpassword(e.target.value);
            }}
            required
            className="border-2 border-emerald-600 text-lg mt-3 text-white outline-none placeholder:text-gray-400 bg-transparent py-2 px-6 rounded-full"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-emerald-600 mt-7 text-lg text-white border-none font-semibold hover:bg-emerald-700 outline-none placeholder:text-white py-2 px-24 rounded-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

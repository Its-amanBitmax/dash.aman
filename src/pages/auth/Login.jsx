import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UPDATED static credentials
  const ADMIN_EMAIL = "amlorix";
  const ADMIN_PASSWORD = "7065aman";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/banner");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Admin Login
        </h2>
        <p className="text-sm text-gray-500 mb-6">Please login to continue</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b3c5d]"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Aman123"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0b3c5d]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0b3c5d] text-white py-2.5 rounded-md font-semibold hover:bg-[#06283d] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, password };
      const res = await axios.post(
        "http://localhost:8000/signup",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200 || res.status === 201) {
        alert("Signup Success");
        navigate("/note/all")
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong...");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-lg relative">

        {/* Back to Home */}
        <Link
          to="/"
          className="absolute left-5 top-5 text-blue-600 font-medium hover:underline"
        >
          ← Back
        </Link>

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;

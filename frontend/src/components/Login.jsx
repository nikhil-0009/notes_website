import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
const[email, setEmail]=useState("")
const[password, setPassword]=useState("")

const {login}= useContext(AuthContext)

const navigate=useNavigate()
const handleLogin=async(e)=>{
    e.preventDefault()
    try {
        const userData={email,password}
        const res=await axios.post("http://localhost:8000/login",
            userData,
            {headers:{"Content-Type":"application/json"}}
        )
        
        login(res.data.user, res.data.token);
        // console.log(res);
        if(res.data.token){
            localStorage.setItem("token",res.data.token)
            alert("login success!!")

            navigate("/note/all")
        }
    } catch (error) {
        if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong...");
      }
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-lg relative">

        <Link
          to="/"
          className="absolute left-5 top-5 text-blue-600 font-medium hover:underline"
        >
          ← Back
        </Link>

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}             //imp
              onChange={(e) => setEmail(e.target.value)}            //imp
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
              placeholder="Enter password"
              value={password}                      //imp
              onChange={(e) => setPassword(e.target.value)}                 //imp
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login
import React from 'react'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">QuickNotes</h1>
      <p className="text-xl mb-8 text-gray-600">Save your thoughts instantly</p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow"
        >
          Signup
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default LandingPage
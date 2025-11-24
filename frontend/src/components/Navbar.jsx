import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="px-6 py-4 bg-gray-900 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Notes App</Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span>Welcome, <b>{user.name}</b></span>
          <button
            onClick={logout}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to="/login" className="bg-blue-600 px-3 py-1 rounded">
            Login
          </Link>
          <Link to="/signup" className="bg-green-600 px-3 py-1 rounded">
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

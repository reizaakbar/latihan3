import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dari localStorage atau lakukan tindakan logout lainnya
    localStorage.removeItem("access_token");
    // Redirect ke halaman login
    navigate("/login");
  };

  return (
    <nav className="py-3 bg-purple-900 navbar-color">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex-shrink-0 flex items-center">
          <span className="text-white text-2xl uppercase font-bold">
            Hacktiv Legends
          </span>
        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4 align-middle font-bold">
            <Link
              to="http://localhost:5173/"
              className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2"
            >
              Home
            </Link>
            <Link
              to="http://localhost:5173/favorite"
              className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2"
            >
              Favourites
            </Link>
            <button
              onClick={handleLogout}
              className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2 bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

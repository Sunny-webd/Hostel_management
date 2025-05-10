import React from "react";
import { useLocation } from "react-router-dom";
import assets from "../assets/assets";

const Navbar = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(1) || "maintenance";

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-800 capitalize">
        {pageName}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Button */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <img className="w-6 h-6" src={assets.notification} alt="Notifications" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

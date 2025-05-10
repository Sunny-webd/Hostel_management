import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import assets from "../assets/assets";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const activePage = useLocation().pathname.split("/")[1] || "dashboard";

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="text-lg font-semibold capitalize text-gray-800 dark:text-black">
        {activePage}
      </div>
    </nav>
  );
};

export default Navbar;

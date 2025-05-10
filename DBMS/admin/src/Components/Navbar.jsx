import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import assets from "../assets/assets";
import "./Navbar.css";

const Navbar = () => {
    // const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

    const activePage = useLocation().pathname.split("/")[1] || "Dashboard";

    // useEffect(() => {
    //     if (darkMode) {
    //         document.body.style.backgroundColor = "#333";
    //         document.body.style.color = "#fff";
    //         localStorage.setItem("theme", "dark");
    //     } else {
    //         document.body.style.backgroundColor = "#fff";
    //         document.body.style.color = "#000";
    //         localStorage.setItem("theme", "light");
    //     }
    // }, [darkMode]);

    const handleLogin = () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    };

    return (
        <nav className="nav-container">
            <div className="page-info capitalize">{activePage}</div>

            <div className="search-bar">
                

                

                {/* <button onClick={() => setDarkMode(!darkMode)} className="btn-nav">
                    {darkMode ? (
                        <img className="btn" src={assets.sun} alt="sun" />
                    ) : (
                        <img className="btn" src={assets.moon} alt="moon" />
                    )}
                </button> */}

                {!isLoggedIn && (
                    <button onClick={handleLogin} className="btn-nav">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

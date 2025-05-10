import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import assets from '../assets/assets.js';
import axios from 'axios';
import { useEffect } from 'react';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const activePage = useLocation().pathname.split("/")[1] || "dashboard";
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (token) {
                    const res = await axios.get('http://localhost:2001/api/staff/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.data) {
                        setUser(res.data.staff);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [token]);

    const handleLogout = () => {
        try {
            // Clear all stored data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.clear();
            
            // Navigate to login page
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback: force redirect
            window.location.href = '/login';
        }
    };

    return (
        <div className={`flex flex-col h-screen bg-white border-r border-gray-200 shadow-lg
                        transition-all duration-300 ease-in-out
                        ${isCollapsed ? 'w-20' : 'w-72'}`}>
            {/* Header/Logo Section */}
            <div className="relative">
                <div className="flex items-center gap-4 p-6 ">
                    <div className="flex-shrink-0">
                        <img 
                            className="w-12 h-12 rounded-xl shadow-lg" 
                            src={assets.logo} 
                            alt="logo" 
                        />
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <h1 className="text-xl font-bold text-blue-600 truncate">
                                IITP HMS
                            </h1>
                            <p className="text-sm text-blue-600">
                                Admin Portal
                            </p>
                        </div>
                    )}
                </div>
            </div>
                  {/* User Profile Section - Now Clickable */}
      {user && (
        <div 
          onClick={() => navigate('/profile')}
          className={`px-4 py-6 border-b border-gray-200 ${isCollapsed ? 'text-center' : ''}
                     cursor-pointer hover:bg-gray-50 transition-colors duration-200`}
        >
          <div className="flex items-center gap-4">
            <img 
              className="w-12 h-12 rounded-xl shadow-md transform transition-transform duration-200 hover:scale-105" 
              src={assets.user} 
              alt="user" 
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.full_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Admin
                </p>
              </div>
            )}
          </div>
        </div>
      )}
            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className='Nav-container'>
                    <li className={activePage === "Dashboard" ? "active-class" : "non-active-class"} >
                        <NavLink to="/Dashboard" className="dash">
                            <img src={assets.dashboard} className="image" alt="Dashboard" />
                            <p className="desc">Dashboard</p></NavLink>
                    </li>
                    <li className={activePage === "Hostel-Management" ? "active-class" : "non-active-class"} >
                        <NavLink to="/Hostel-Management" className="dash"><img src={assets.roommanagment} className="image" alt="room" /><p className="desc">Hostel Management</p></NavLink>
                    </li>
                    <li className={activePage === "Staff-Management" ? "active-class" : "non-active-class"}>
                        <NavLink to="/Staff-Management" className="dash"><img src={assets.team} className="image" alt="staff"/><p className="desc">Staff Management</p></NavLink>
                    </li>
                    <li className={activePage === "Maintainance" ? "active-class" : "non-active-class"} >
                        <NavLink to="/Maintainance" className="dash"><img src={assets.maintanance} className="image" alt="maintainance"/><p className="desc">Maintanance</p></NavLink>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className={`
                        w-full group relative overflow-hidden rounded-xl
                        ${isCollapsed ? 'p-3 justify-center' : 'px-4 py-3'}
                        bg-gradient-to-r from-red-500 to-pink-500
                        hover:from-red-600 hover:to-pink-600
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    `}
                >
                    <div className="relative z-10 flex items-center gap-3 text-white">
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        {!isCollapsed && (
                            <span className="text-sm font-medium">Logout</span>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
import React, { useEffect, useState } from "react";
import {Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Dashboard from "./Components/Dashboard";
import ReportIssue from "./Components/ReportIssue";
import StatusReq from "./Components/StatusReq";
import RoomBooking from "./Components/RoomBooking";
import Booking from "./Components/Booking";
import Login from "./Components/Login";
import Allot from "./Components/Allot";
import LoadingScreen from './Components/LoadingScreen';
import axios from "axios";

function App() {
  const [isToken, setIsToken] = useState(!!localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsToken(!!localStorage.getItem("token"));

    // Check if we have stored user data
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      setIsLoading(false);
      return;
    }

    // Verify token validity
    const verifyAuth = async () => {
      try {
        const response = await axios.get("http://localhost:2001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.data.user) {
          localStorage.clear();
        }
      } catch (error) {
        localStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {isToken ? (
        <div className="flex w-full h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Navbar />
            <div className="flex-1 p-2 overflow-y-auto">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/report" element={<ReportIssue />} />
                <Route path="/track-report" element={<StatusReq />} />
                <Route path="/room-booking" element={<RoomBooking />} />
                <Route path="/booking/hostel/:year/:hostelID" element={<Booking />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/allot/:RoomID" element={<Allot />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

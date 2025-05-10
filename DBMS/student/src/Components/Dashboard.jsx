import React, { useEffect, useState } from "react";
import axios from "axios";
import assets from "../assets/assets";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [floor, setFloor] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Unauthorized: No token found.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:2001/api/student/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User Data:", res.data);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error.response || error.message);
        setError("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, [token,checkout]);

  const checkouthandler = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:2001/api/student/checkout", 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Checkout Successful:", res.data);
      setUserData(null); 
      setCheckout(true);
    } catch (error) {
      console.error("Error during checkout:", error.response || error.message);
      setError(
        error.response?.data?.message || "Failed to process checkout. Please try again."
      );
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Room Allocation Found</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl">
                <img src={assets.user} className="w-full h-full object-cover" alt="Profile" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {userData?.full_name || "Welcome Back!"}
                </h1>
                <p className="text-blue-100 text-lg">
                  {userData?.hostelName || "Loading..."} • Room {userData?.roomNo || "---"}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 p-8">
            <svg className="w-32 h-32 text-white/5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
            </svg>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickStatCard
            title="Check-in Date"
            value={userData?.check_in_date || "Loading..."}
            icon="📅"
            color="blue"
          />
          <QuickStatCard
            title="Check-out Date"
            value={userData?.check_out_date || "Loading..."}
            icon="🗓️"
            color="blue"
          />
          <QuickStatCard
            title="Room Type"
            value={userData?.roomType || "Standard"}
            icon="🏠"
            color="blue"
          />
          <QuickStatCard
            title="Status"
            value="Active"
            icon="✅"
            color="blue"
          />
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Room Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Room Details</h2>
              <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                Room {userData?.roomNo}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem
                label="Hostel"
                value={userData?.hostelName}
                icon="🏢"
              />
              <DetailItem
                label="Floor"
                value={userData?.floor || "Ground"}
                icon="⬆️"
              />
              <DetailItem
                label="Wing"
                value={userData?.wing || "A"}
                icon="📍"
              />
              <DetailItem
                label="Room Capacity"
                value={userData?.capacity || "1"}
                icon="👥"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Amenities</h2>
            <div className="space-y-4">
              {(userData?.amenities || ["WiFi", "AC", "Study Table", "Chair"]).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={checkouthandler}
            className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white 
                     rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 
                     transition-all duration-200"
          >
            <span className="relative z-10">Checkout</span>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickStatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    emerald: "from-emerald-500 to-emerald-600"
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${colorClasses[color]}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl">{icon}</span>
          <div className={`text-${color}-500 text-sm font-medium px-2.5 py-0.5 rounded-full bg-${color}-50`}>
            Active
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, icon }) => (
  <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50">
    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;

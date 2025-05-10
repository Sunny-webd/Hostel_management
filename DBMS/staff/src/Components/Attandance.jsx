import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [isActive, setIsActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:2001/api/staff/attandance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsActive(res.data.status);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error fetching attendance status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [token]);

  const toggleAttendance = async () => {
    try {
      await axios.put(
        "http://localhost:2001/api/staff/mark-attandance",
        { status: !isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsActive(!isActive);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Attendance Status</h2>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <div className={`p-6 rounded-lg border ${
                isActive 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <p className={`text-lg font-semibold ${
                    isActive ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {isActive ? "Currently Active" : "Currently Inactive"}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={toggleAttendance}
              className={`w-full py-3 rounded-lg font-medium text-white transition-all 
                       duration-200 ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } shadow-sm hover:shadow-md`}
            >
              {isActive ? "Mark as Inactive" : "Mark as Active"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "../Pannels/RequestCard";
import {jwtDecode} from "jwt-decode";

const StatusReq = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);
        const residentId = decodedToken.id; 

        console.log("Extracted Resident ID:", residentId);

        const res = await axios.get(`http://localhost:2001/api/student/allissue/${residentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Issues:", res.data);
        setRequests(res.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch issues");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  if (loading) return <p className="text-center text-gray-500">Loading issues...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-40 bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Request Status</h2>
              <p className="text-green-100">Track your maintenance and service requests</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Requests Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request.id} className="transform transition-all duration-200 hover:-translate-y-1">
                  <RequestCard request={request} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No Requests Found</h3>
                  <p className="mt-2 text-gray-500">You haven't submitted any maintenance requests yet.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusReq;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const ReportIssue = () => {
  const [details, setIssueDetails] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resident_id, setResidentId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        setResidentId(decodedToken.id)
        console.log(decodedToken.id)
      } catch (error) {
        setMessage("Invalid token. Please log in again.");
      }
    } else {
      setMessage("User not authenticated. Please log in.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resident_id) {
      setMessage("User authentication failed. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:2001/api/student/issue",
        { resident_id, details, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message || "Issue reported successfully!");
      setIssueDetails("");
      setPriority("Low");
    } catch (error) {
      console.error("Error reporting issue:", error);
      setMessage(error.response?.data?.message || "Failed to report issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-40 bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Report an Issue</h2>
              <p className="text-purple-100">Submit your maintenance or service request</p>
            </div>
          </div>
          
          <div className="p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes("success") 
                  ? "bg-green-50 border-l-4 border-green-500 text-green-700"
                  : "bg-red-50 border-l-4 border-red-500 text-red-700"
              }`}>
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resident ID</label>
                <input
                  type="text"
                  value={resident_id}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                           text-gray-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Details</label>
                <textarea
                  value={details}
                  onChange={(e) => setIssueDetails(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                           transition-colors duration-200 min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                           transition-colors duration-200"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-white font-medium hover:from-purple-700 hover:to-indigo-700 
                         transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Issue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;

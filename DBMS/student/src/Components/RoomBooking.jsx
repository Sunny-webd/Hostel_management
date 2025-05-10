import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HostelCard from "../Pannels/HostelCard";

const RoomBooking = () => {
  const [selectedHostel, setSelectedHostel] = useState("");
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState("");
  const [hostelType, setHostelType] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) {
      setError("Unauthorized: Please log in.");
      return;
    }

    setLoading(true);
    axios.get("http://localhost:2001/api/student/hostelinfo", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setHostels(response.data.hostels || []);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching hostels:", error);
      setError("Failed to load hostels.");
      setLoading(false);
    });
  }, [token]);

  // Apply filters
  const filteredHostels = hostels.filter((h) => {
    const yearMatch = !year || h.year === year;
    const typeMatch = !hostelType || h.hosteltype === hostelType;
    return yearMatch && typeMatch;
  });

  const filteredRooms = rooms.filter((r) => {
    const yearMatch = !year || r.year === year;
    const typeMatch = !hostelType || r.hosteltype === hostelType;
    return yearMatch && typeMatch;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">

      {error && <p className="text-red-600">{error}</p>}

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Hostel Name Selector */}

        {/* Year Filter */}
        <select
          className="w-64 p-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">All Years</option>
          {["1", "2", "3", "4", "PhD", "Guest"].map((y, i) => (
            <option key={i} value={y}>{y}</option>
          ))}
        </select>

        {/* Hostel Type Filter */}
        <select
          className="w-64 p-2 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
          value={hostelType}
          onChange={(e) => setHostelType(e.target.value)}
        >
          <option value="">All Hostel Types</option>
          {["Boys Hostel", "Girls Hostel", "Guest House"].map((type, i) => (
            <option key={i} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {/* Show All Hostels */}
      { filteredHostels.length > 0 && !loading && (
        <div className="w-full max-w-3xl mt-4 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">All Hostels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredHostels.map((hostel) => (
              <div key={hostel.hostelID} className="p-4 border rounded-lg shadow-md bg-blue-100">
                <HostelCard hostel={hostel} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && selectedHostel && filteredRooms.length === 0 && (
        <p>No rooms available for this hostel.</p>
      )}
    </div>
  );
};

export default RoomBooking;

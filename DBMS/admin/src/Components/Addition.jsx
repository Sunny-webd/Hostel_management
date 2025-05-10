import React, { useState } from "react";
import axios from "axios";
import "./Addition.css";

const Addition = () => {
  const [Nofloor, setNofloor] = useState(1);
  const [rooms, setRooms] = useState({});
  const [hostelName, setHostelName] = useState("");
  const [hostelID, setHostelID] = useState("");
  const [status, setStatus] = useState("");
  const [facilities, setFacilities] = useState("");
  const [year, setYear] = useState("");
  const [hosteltype, setHostelType] = useState("");
  const [managerID, setManagerID] = useState("");

  const token = localStorage.getItem("token");

  const handleRoomChange = (floor, value) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [floor]: value,
    }));
  };

  const handleSubmit1 = async () => {
    const aboveGroundFloorData = {
      aboveGroundRooms: Object.fromEntries(
        Object.entries(rooms).filter(([floor]) => Number(floor) >= 0)
      ),
    };
    try {
      const res2 = await axios.post(
        `http://localhost:2001/api/staff/hostel/rooms/${hostelID}`,
        aboveGroundFloorData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res2.status !== 201) {
        alert("Unsuccessful Submission");
        return;
      }
      alert("Successful Submission");
      setRooms({});
      setHostelName("");
      setHostelID("");
      setStatus("");
      setFacilities("");
      setYear("");
      setHostelType("");
      setManagerID("");
      setNofloor(1);
    } catch (error) {
      console.error("API Error:", error);
      alert("Internal Error. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      alert("Unauthorized: Please log in.");
      return;
    }

    const groundFloorData = {
      hostelName,
      hostelID,
      status,
      Nofloor,
      facilities,
      year,
      hosteltype,
      managerID
    };

    try {
      const res1 = await axios.post(
        "http://localhost:2001/api/staff/newhostel",
        groundFloorData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res1.status !== 201) {
        alert("Unsuccessful Submission");
        return;
      }
      alert("Successfully Added");

    } catch (error) {
      console.error("API Error:", error);
      alert("Internal Error. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Hostel</h1>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hostel Name
                </label>
                <input
                  type="text"
                  value={hostelName}
                  onChange={(e) => setHostelName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hostel ID
                </label>
                <input
                  type="text"
                  value={hostelID}
                  onChange={(e) => setHostelID(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Floors
                </label>
                <input
                  type="number"
                  min="1"
                  value={Nofloor}
                  onChange={(e) => setNofloor(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facilities
                </label>
                <input
                  type="text"
                  placeholder="AC, WIFI, LAN etc"
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Year</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="PhD">PhD</option>
                      <option value="Guest">Guest</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hostel Type
                    </label>
                    <select
                      value={hosteltype}
                      onChange={(e) => setHostelType(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Hostel Type</option>
                      <option value="Boys Hostel">Boys Hostel</option>
                      <option value="Girls Hostel">Girls Hostel</option>
                      <option value="Guest House">Guest House</option>
                    </select>
                  </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manager ID
                </label>
                <input
                  type="text"
                  value={managerID}
                  onChange={(e) => setManagerID(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Room Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ground Floor Rooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={rooms[0] || ""}
                    onChange={(e) => handleRoomChange(0, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: Nofloor - 1 }, (_, i) => (
                    <div key={i}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Floor {i + 1} Rooms
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={rooms[i + 1] || ""}
                        onChange={(e) => handleRoomChange(i + 1, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Hostel
              </button>
              <button
                onClick={handleSubmit1}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Room Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addition;

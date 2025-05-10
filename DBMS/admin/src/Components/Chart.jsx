import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chart.css";

const Chart = () => {
  const { hostelID } = useParams();
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const res = await axios.get(`http://localhost:2001/api/staff/hostel/rooms/${hostelID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", res.data);

        if (res.data && res.data.hostel) {
          const floorArray = Array.from({ length: res.data.hostel.Nofloor }, (_, i) => i);
          console.log(floorArray)
          setFloors(floorArray);
          setSelectedFloor(floorArray[0]);
        }
      } catch (error) {
        console.error("Error fetching floors:", error);
      }
    };

    fetchFloors();
  }, [hostelID, token]);

  useEffect(() => {
    if (selectedFloor === null) return;

    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:2001/api/staff/hostel/rooms/${hostelID}/${selectedFloor}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(`Rooms on Floor ${selectedFloor}:`, res.data.rooms);
        setRooms(res.data.rooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [selectedFloor, hostelID, token]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Floor Plan</h2>
        
        <div className="space-y-6">
          {/* Floor Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Select Floor:</h3>
            <div className="flex flex-wrap gap-2">
              {floors.map((floor) => (
                <button
                  key={floor}
                  onClick={() => setSelectedFloor(floor)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedFloor === floor 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Floor {floor}
                </button>
              ))}
            </div>
          </div>

          {/* Room Grid */}
          {selectedFloor !== null && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-600 mb-4">
                Rooms on Floor {selectedFloor}:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {rooms.map((room) => (
                  <button
                    key={room.RoomID}
                    onClick={() => navigate(`/inforoom/${room.RoomID}`)}
                    className={`p-4 rounded-lg text-center transition-all duration-200 
                      transform hover:scale-105 hover:shadow-md
                      ${room.is_booked 
                        ? 'bg-red-50 text-red-700 border border-red-200' 
                        : 'bg-green-50 text-green-700 border border-green-200'}`}
                  >
                    <div className="font-medium text-lg mb-1">
                      Room {room.RoomNo}
                    </div>
                    <div className="text-xs">
                      {room.is_booked ? 'Occupied' : 'Available'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;

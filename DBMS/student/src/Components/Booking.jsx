import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const { year, hostelID } = useParams();
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const res = await axios.get(`http://localhost:2001/api/student/hostel/rooms/${hostelID}/${selectedFloor}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("API Response:", res.data);

        if (res.data && res.data.floorcount) {
          const floorArray = Array.from({ length: res.data.floorcount }, (_, i) => i);
          setFloors(floorArray);
          setSelectedFloor(floorArray[0]);
        }
      } catch (error) {
        console.error("Error fetching floors:", error);
      }
    };

    fetchFloors();
  }, [token]); 

  useEffect(() => {
    if (selectedFloor === null) return;

    const fetchRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:2001/api/student/hostel/rooms/${hostelID}/${selectedFloor}`, {
          params: { floor: selectedFloor },
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log(`Rooms on Floor ${selectedFloor}:`, res.data.rooms);
        setRooms(res.data.rooms || []); 
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [selectedFloor, token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-2">Room Booking</h2>
              <p className="text-blue-100 text-lg">
                Academic Year {year} • Hostel #{hostelID}
              </p>
            </div>
            <div className="absolute bottom-0 right-0 p-8">
              <svg className="w-24 h-24 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Floor Selection Panel */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Select Floor</h3>
                <p className="text-sm text-gray-500 mt-1">Choose your preferred floor level</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {floors.length > 0 ? (
                    floors.map((floor) => (
                      <button
                        key={floor}
                        onClick={() => setSelectedFloor(floor)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200
                          ${selectedFloor === floor
                            ? "bg-blue-50 border-2 border-blue-200"
                            : "hover:bg-gray-50 border border-gray-200"
                          }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                            ${selectedFloor === floor
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-600"
                            }`}>
                            <span className="text-lg font-semibold">{floor}</span>
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${selectedFloor === floor ? "text-blue-700" : "text-gray-700"}`}>
                              Floor {floor}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selectedFloor === floor ? "Selected" : "Click to select"}
                            </p>
                          </div>
                        </div>
                        {selectedFloor === floor && (
                          <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                          </svg>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse flex space-x-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                          <div className="flex-1 space-y-2 py-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rooms Grid Panel */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Available Rooms</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedFloor !== null 
                        ? `Showing rooms on Floor ${selectedFloor}`
                        : "Select a floor to view rooms"}
                    </p>
                  </div>
                  {selectedFloor !== null && (
                    <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                      Floor {selectedFloor}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {selectedFloor !== null && rooms.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                      <button
                        key={room.RoomID}
                        onClick={() => !room.is_booked && navigate(`/allot/${room.RoomID}`)}
                        disabled={room.is_booked}
                        className={`group relative overflow-hidden rounded-xl transition-all duration-300
                          ${room.is_booked
                            ? "bg-red-50"
                            : "bg-green-50 hover:shadow-lg hover:scale-105"
                          }`}
                      >
                        <div className="p-6">
                          <div className="text-center">
                            <div className={`text-3xl font-bold mb-2
                              ${room.is_booked ? "text-red-600" : "text-green-600"}`}>
                              {room.RoomNo}
                            </div>
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                              ${room.is_booked
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                              }`}>
                              {room.is_booked ? (
                                <>
                                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
                                  </svg>
                                  Occupied
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                                  </svg>
                                  Available
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {!room.is_booked && (
                          <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-green-600/30 
                                      opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="bg-white px-4 py-2 rounded-lg text-green-700 font-medium shadow-lg transform 
                                         scale-0 group-hover:scale-100 transition-transform duration-200">
                              Book Now
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    {selectedFloor === null ? (
                      <>
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Floor Selected</h3>
                        <p className="text-gray-500 text-center max-w-sm">
                          Please select a floor from the left panel to view available rooms
                        </p>
                      </>
                    ) : (
                      <div className="w-full max-w-2xl">
                        <div className="animate-pulse grid grid-cols-3 gap-6">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Inforoom = () => {
    const { RoomID } = useParams();
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);
    const [occupants, setOccupants] = useState([]);
    const [hostel, setHostel] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRoomDetails = async () => {
            if (!RoomID || !token) {
                setError("Missing Room ID or authentication token.");
                return;
            }

            try {
                const res = await axios.get(`http://localhost:2001/api/staff/rooms/${RoomID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.data || !res.data.success) {
                    setError("Room not found.");
                    return;
                }
                console.log(res.data);

                setRoom(res.data.bookings[0] || null);
                setHostel(res.data.hostelData[0] || null);
                setOccupants(res.data.studentInfo || []);
            } catch (err) {
                console.error("Error fetching room details:", err);
                setError("Failed to load room details. Please try again later.");
            }
        };

        fetchRoomDetails();
    }, [RoomID, token]);

    if (error) return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-lg font-medium text-red-800">Room Not Booked Yet</h2>
                </div>
            </div>
        </div>
    );

    if (!room) return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <h2 className="mt-4 text-gray-600">Loading room details...</h2>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Room Header */}
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Room {room.Room_allocationID} Details
                        </h2>
                    </div>

                    {/* Room Information */}
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Hostel Name</label>
                                    <p className="mt-1 text-gray-900">{hostel?.hostelName || "Not Available"}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Room Number</label>
                                    <p className="mt-1 text-gray-900">{room.RoomID}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Facilities</label>
                                    <p className="mt-1 text-gray-900">
                                        {hostel?.facilities ? (
                                            <div className="flex flex-wrap gap-2">
                                                {hostel.facilities.map((facility, index) => (
                                                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                        {facility}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : "Not Available"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Occupants Section */}
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Occupants</h3>
                            {occupants.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {occupants.map((occupant, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium">
                                                            {occupant.full_name[0]}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{occupant.full_name}</p>
                                                        <p className="text-sm text-gray-500">Roll No: {occupant.id}</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm space-y-2">
                                                    <p className="flex items-center text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        {occupant.phone_number}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        {occupant.email}
                                                    </p>
                                                    <p className="flex items-center text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        {occupant.Gender}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                                    <p className="text-gray-500">No occupant details available.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inforoom;

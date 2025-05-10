import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Allot = () => {
  const { RoomID } = useParams(); 
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); 

  const handleBooking = async () => {
    try {
      if (!token) {
        setError("Unauthorized: Please log in.");
        return;
      }
      const response = await axios.post(
        "http://localhost:2001/api/student/hostel/book",
        { RoomID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(!response.data){ 
        setError(response.data.message);
        return
      } 
      setBookingDetails(response.data.booking); 
      setError(null);
    } catch (err) {
      console.error("Booking failed:", err);
      setError(" You have already booked a room.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-40 bg-gradient-to-r from-blue-600 to-cyan-600 p-8">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Room Allocation</h2>
              <p className="text-blue-100">Confirm your room booking</p>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {!bookingDetails && (
              <div className="text-center">
                <button
                  onClick={handleBooking}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white 
                           rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 
                           transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Confirm Booking
                </button>
              </div>
            )}

            {bookingDetails && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
                
                <div className="grid gap-4">
                  <DetailItem label="Hostel" value={bookingDetails.hostelID} />
                  <DetailItem label="Room No" value={bookingDetails.RoomID} />
                  <DetailItem label="Check-in Date" value={bookingDetails.check_in_date} />
                  <DetailItem label="Check-out Date" value={bookingDetails.check_out_date} />
                  <DetailItem label="Room Allocation ID" value={bookingDetails.Room_allocationID} />
                </div>

                <div className="pt-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-700">Your room has been successfully booked!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

export default Allot;

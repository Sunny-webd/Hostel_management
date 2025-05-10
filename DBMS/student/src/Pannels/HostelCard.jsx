import React from "react";
import assets from "../assets/assets.js"
import { useNavigate } from "react-router-dom";

const HostelCard = ({ hostel }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/booking/hostel/${hostel.year}/${hostel.hostelID}`);
  };
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 p-4 transition-transform transform hover:scale-105">
      <div className="relative w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center">
        <img
          src={assets.download}
          alt="Hostel"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800">🏠 {hostel.hostelname || "Hostel Room"}</h2>
        <p className="text-gray-600">Room Type: <span className="font-medium">{hostel.roomType || "Shared"}</span></p>
        <p className="text-gray-600">Hostel: <span className="font-medium">{hostel.hostelname || "Unknown"}</span></p>
        <p className={`text-lg font-semibold ${hostel.status === "booked" ? "text-red-600" : "text-green-600"}`}>
          Room Status: {hostel.status === "booked" ? "Booked" : "Available"}
        </p>
        <p className="text-gray-600">Shared: <span className="font-medium">{hostel.shared || "N/A"}</span></p>
        
        {hostel.status !== "booked" && (
          <button onClick={handleBook} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300">
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default HostelCard;

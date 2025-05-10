import React from 'react';
import './hostel.css';
import { useNavigate } from 'react-router-dom';

const Hostels = ({ hostel }) => {
  const navigate = useNavigate();

  if (!hostel) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <p className="text-gray-500">Loading hostel information...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{hostel.hostelname}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            hostel.status  
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {hostel.status?"Active":"Inactive"}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Type: {hostel.hosteltype}</span>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Facilities:</h4>
            <div className="flex flex-wrap gap-2">
              {hostel.facilities && hostel.facilities.length > 0 ? (
                hostel.facilities.map((facility, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {facility}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No facilities available</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate(`/chart/${hostel.hostelID}`)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hostels;

import React, { useEffect, useState } from 'react';
import HOSTELS_INFO from '../Pannels/HOSTELS_INFO';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RM = () => {
  const [hostelData, setHostelData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        const res = await axios.get('http://localhost:2001/api/staff/hostelinfo', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(res.data.hostels)
        if (!res.data || !res.data.hostels){
          alert("Data not found");
          return;
        }
        setHostelData(res.data.hostels);
      } catch (error) {
        console.error("Internal error:", error);
      }
    };
    fetchHostelData();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Hostel Management</h1>
          <button 
            onClick={() => navigate('/Addition')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add New Hostel</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostelData.length > 0 ? (
            hostelData.map((hostel) => (
              <div key={hostel.hostelID} className="transform hover:-translate-y-1 transition-all duration-200">
                <HOSTELS_INFO hostel={hostel} />
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center p-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading hostels...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RM;

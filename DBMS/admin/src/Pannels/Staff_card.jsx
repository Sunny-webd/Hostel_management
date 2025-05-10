import React, { useState } from 'react';
import './staff.css';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from "lucide-react";
import axios from 'axios';
import { tr } from 'framer-motion/client';
const Staff_card = ({ staff, index }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleMenuToggle = (clickedIndex) => {
    setOpenMenuIndex(openMenuIndex === clickedIndex ? null : clickedIndex);
  };

  const deletestaff=async(staff_id)=>{
    try {
      if (!token) {
        console.error('No token found');
        return;
      } 
      const response = await axios.delete(`http://localhost:2001/api/staff/deletestaff/${staff_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
      },
      });
      if (response.data) {
        console.log('Staff deleted successfully');
        window.location.reload();
      } else {
        console.error('Failed to delete staff');
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  }
  const handleAction = (action, staffId) => {
    switch (action) {
      case "view":
        navigate(`/staff_info/${staffId}`);
        break;
      case "delete":
        deletestaff(staffId);
        console.log("Delete", staffId);
        break;
      default:
        break;
    }
    setOpenMenuIndex(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center space-x-4 relative">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xl font-semibold">
              {staff.full_name?.[0]?.toUpperCase() || 'S'}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{staff.full_name}</h3>
            <p className="text-sm text-gray-500">{staff.role || 'Staff Member'}</p>
          </div>
          <div className='absolute right-4'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMenuToggle(index);
              }}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <MoreVertical size={18} />
            </button>
            {openMenuIndex === index && (
              <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-md p-2 z-10">
                <button onClick={() => handleAction('view', staff.StaffId)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</button>
                <button onClick={() => handleAction('delete', staff.StaffId)} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100">Delete</button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {staff.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {staff.phone_number || 'Not provided'}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              staff.status === 'true'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {staff.status ? "Active" : "Inactive"}
            </span>
            <span className="text-sm text-gray-500">
              ID: {staff.StaffId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff_card;

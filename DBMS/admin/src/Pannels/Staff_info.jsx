import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './staff_info.css'; // Import the CSS file

const Staff_info = () => {
    const { id } = useParams();
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Dob,setDob]=useState('');
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/api/staff/info/${id}`,{
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                console.log(response.data);
                setStaff(response.data.staff);
                const dateString = response.data.staff.Dob;
                const formattedDate = dateString.split("T")[0];
                setDob(formattedDate);
            } catch (err) {
                setError('Failed to fetch staff details.');
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [id]);

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!staff) return <div className="error-message">Staff not found.</div>;

    return (
        <div className="staff-info-container">
            <h2>Staff Details</h2>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Name</strong> <span className='capitalize'>{staff.full_name}</span></p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Status</strong> <span className={staff.status ? 'active-status' : 'inactive-status'}>
              {staff.status ? 'Active' : 'Inactive'}
            </span></p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>DOB</strong> {Dob}</p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Gender</strong> {staff.Gender}</p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Address</strong> {staff.address}</p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Role</strong> {staff.role}</p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Email</strong> {staff.email}</p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Mobile No</strong> {staff.phone_number}</p>
            <p className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'><strong className='font-bold text-gray-900'>Aadhar No</strong> {staff.aadhar_number}</p>
        </div>
    );
};

export default Staff_info;
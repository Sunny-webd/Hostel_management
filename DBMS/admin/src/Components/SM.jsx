import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Staff_card from '../Pannels/Staff_card';
import '../Pannels/staff.css';
import axios from 'axios';
import './SM.css'

const SM = () => {
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchStaffData = async () => {
            try {
                const response = await axios.get('http://localhost:2001/api/staff/staffinfo', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(!response.data || !response.data.staff){
                    alert("Data not found");
                    return;
                }
                console.log(response.data)
                setStaffData(response.data.staff || []); 
                
            } catch (error) {
                console.error('Error fetching staff data:', error.response?.data || error.message);
            }
        };

        fetchStaffData();
    }, [token, navigate]);

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Staff Management</h2>
                    <button 
                        onClick={() => navigate('/Staffadd')}
                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        +
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staffData.length > 0 ? (
                        staffData.map((staff, index) => (
                            <div key={staff.StaffId || index} className="transform hover:-translate-y-1 transition-all duration-200">
                                <Staff_card staff={staff} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500 text-center">No staff data available.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SM;

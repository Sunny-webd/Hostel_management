import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import StaffCard from '../Pannels/StaffCard';
import axios from 'axios';

const Dashboard = () => {

  const token = localStorage.getItem("token");
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalBooked, setTotalBooked] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [HostelCount, setHostelCount] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [issueCount, setIssueCount] = useState(0);
  const [error, setError] = useState(null);
  const [staffData, setStaffData] = useState([]);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`http://localhost:2001/api/staff/dashinfo`,{
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!res.data || !res.data.success) {
          setError("No data found.");
          return;
        }

        const { result, bookedCount, result1, HostelCount, staffCount, issueCount } = res.data.finalresult;

        setTotalRooms(result[0]?.totalRooms || 0);
        setTotalBooked(bookedCount || 0);
        setTotalStudent(result1[0]?.totalStudents || 0);
        setHostelCount(HostelCount || 0);
        setTotalStaff(staffCount || 0);
        setIssueCount(issueCount || 0);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      }
    };

    fetchDashboardData();
  }, [token]);

  useEffect(()=>{
    const fetchStaffData=async()=>{
      try{
        const res=await axios.get('http://localhost:2001/api/staff/active',{
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if(!res.data || !res.data.staff){
          alert("Data not found");
          return;
        }
        console.log(res.data.staff)
        setStaffData(res.data.staff);
      }catch(error){
        console.log(error);
        setError('Failed to fetch staff data.');
      }
    };

    fetchStaffData();
  },[token]);
  
  useEffect(() => {
    console.log("Updated staffData:", staffData);
    console.log("Type of staffData:", typeof staffData);
  }, [token,staffData]);

  return (
    <div className="p-6">
      {/* Stats Cards Grid */}
      <div  className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Student Stats Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-6 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-blue-800">
              Student Count: {totalStudent}
            </p>
            <p className="text-lg font-semibold text-blue-800">
              Hostel Count: {HostelCount}
            </p>
          </div>
        </div>
        {/* Room Stats Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200 p-6 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-green-800">
              Total Rooms: {totalRooms}
            </p>
            <p className="text-lg font-semibold text-green-800">
              Total Rooms Booked: {totalBooked}
            </p>
          </div>
        </div>

        {/* Staff Stats Card */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm border border-orange-200 p-6 hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-orange-800">
              Total Staff: {totalStaff}
            </p>
            <p className="text-lg font-semibold text-orange-800">
              Pending Work: {issueCount}
            </p>
          </div>
        </div>
      </div>

      {/* Staff Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-800">Staff</h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {staffData.length } Active
            </span>
          </div>
        </div>

        {Array.isArray(staffData) && staffData.length > 0 ? (
            <div className="space-y-4">
            {staffData.map((staff) => (
                <StaffCard key={staff.StaffId} staff={staff} />
            ))}
            </div>
            ) : (
                  <p className="text-gray-500">No active staff available.</p>
          )}

      </div>
    </div>
    </div>
  );
};

export default Dashboard;

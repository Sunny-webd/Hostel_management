import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Maintainance.css';

const Maintainance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [assigned, setAssigned] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/staff/maintenance', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMaintenanceData(response.data.issue);
      } catch (error) {
        console.error('Error fetching maintenance data:', error);
      }
    };

    const fetchStaffList = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/staff/staffinfo', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setStaffList(response.data.staff);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchMaintenanceData();
    fetchStaffList();
  }, [token]);

  const handleAssign = async (id) => {
    if (!token) {
      alert("You must be logged in to assign tasks.");
      return;
    }

    const assignedTo = assigned[id];

    if (!assignedTo) {
      alert("Please select a staff member.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:2001/api/staff/assign/${id}`,
        { assignedTo },
        { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      if (!response.data.success) {
        alert("Task assignment failed!");
        return;
      }

      alert("Task assigned successfully!");
      setMaintenanceData((prevData) =>
        prevData.map((issue) =>
          issue.id === id ? { ...issue, assigned_to: assignedTo } : issue
        )
      );
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task. Try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Maintenance Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Complaint ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {maintenanceData.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{issue.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          issue.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {issue.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.assigned_to ? (
                        <span className="font-medium text-gray-900">{issue.assigned_to}</span>
                      ) : (
                        <select 
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          onChange={(e) => setAssigned({ ...assigned, [issue.id]: e.target.value })}
                        >
                          <option value="">Assign to...</option>
                          {staffList.map((staff) => (
                            <option key={staff.id} value={staff.full_name}>
                              {staff.full_name}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issue.Created?.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => handleAssign(issue.id)}
                        disabled={!!issue.assigned_to || !assigned[issue.id]}
                        className={`px-4 py-2 rounded-md text-sm font-medium
                          ${issue.assigned_to 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : !assigned[issue.id]
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        {issue.assigned_to ? "Assigned" : "Assign"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintainance;

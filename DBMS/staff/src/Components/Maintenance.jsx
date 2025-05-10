import React, { useState, useEffect } from "react";
import axios from "axios";

const Maintenance = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:2001/api/staff/issue/assignedto", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if(!response.data){
          setTasks([]);
          return;
        }
        console.log(response.data);
        setTasks(response.data.issues || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:2001/api/staff/issue/progress/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Maintenance Tasks</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500">No maintenance tasks found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {task.hostelName}
                        </h3>
                        <p className="text-gray-600 text-base mb-4">
                          {task.details}
                        </p>
                        <div className="flex items-center space-x-6">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ')}
                          </span>
                          <span className="text-sm text-gray-500">
                            Room: {task.roomNumber}
                          </span>
                        </div>
                      </div>
                      <div>
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                          className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium 
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                                   bg-white hover:bg-gray-50 transition-colors duration-200
                                   min-w-[140px]"
                        >
                          <option value="pending">Pending</option>
                          <option value="Processing">In Progress</option>
                          <option value="Resolved">Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

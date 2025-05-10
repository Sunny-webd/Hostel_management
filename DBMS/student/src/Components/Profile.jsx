import React, { useState, useEffect } from "react";
import axios from "axios";
import assets from "../assets/assets";

const Profile = () => {
  const [user, setUser] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editedUser, setEditedUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem("token"); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:2001/api//users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("Fetched Profile:", response.data);
      setUser(response.data);
      setEditedUser(response.data.user);
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      setError("An error occurred while fetching the profile.");
    })
    .finally(() => setLoading(false));
  }, [token]);

  
  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isEditing) {
      axios.put("http://localhost:2001/api/users/profile", editedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setUser(editedUser)) 
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError("An error occurred while updating the profile.");
      });
    }
    setIsEditing(!isEditing); 
  };

  if (loading) return <p className="text-center text-gray-700 mt-4">🔄 Loading Profile...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-2">Profile Settings</h2>
              <p className="text-blue-100">Manage your account information</p>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <img 
                  className="w-32 h-32 rounded-2xl shadow-lg border-4 border-white" 
                  src={assets.user} 
                  alt="Profile" 
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Read-only Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-700 font-medium">
                    {editedUser.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-700 font-medium">
                    {editedUser.role}
                  </div>
                </div>
              </div>

              {/* Editable Fields */}
              {["full_name", "username", "phone_number"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  {isEditing ? (
                    <input
                      type= "text"
                      name={field}
                      value={editedUser[field]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                               focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    />
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 rounded-xl text-gray-700">
                      {editedUser[field]}
                    </div>
                  )}
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 
                               transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 
                               transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 
                             transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

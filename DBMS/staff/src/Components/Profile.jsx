import React, { useState, useEffect } from "react";
import axios from "axios";
import assets from "../assets/assets";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:2001/api/staff/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.staff);
        setEditedUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [token,user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const res = await axios.put("http://localhost:2001/api/staff/update/profile", editedUser, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if(!res.data) return;
        setUser(editedUser);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  if (!user) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile</h2>

        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md mb-4"
            src={assets.user}
            alt="User Avatar"
          />
          <div className="w-full">
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">Staff ID:</label>
              <p className="bg-gray-100 px-3 py-2 rounded-md">{user.StaffId}</p>
            </div>

            {["full_name", "Dob", "phone_number"].map((field, index) => (
              <div key={index} className="mb-3">
                <label className="block text-gray-600 font-semibold mb-1 capitalize">{field}:</label>
                {isEditing ? (
                  <input
                    type={field === "Dob" ? "date" : "text"}
                    name={field}
                    value={editedUser[field]}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="bg-gray-100 px-3 py-2 rounded-md">{user[field]}</p>
                )}
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">Gender:</label>
              <p className="bg-gray-100 px-3 py-2 rounded-md">{user.Gender}</p>
            </div>

            {<div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">Email:</label>
              <p className="bg-gray-100 px-3 py-2 rounded-md">{user.email}</p>
            </div>}

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">Role:</label>
              <p className="bg-gray-100 px-3 py-2 rounded-md">{user.role}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-1">Joining Date:</label>
              <p className="bg-gray-100 px-3 py-2 rounded-md">{user.joining_date}</p>
            </div>
            <button
              onClick={handleEdit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

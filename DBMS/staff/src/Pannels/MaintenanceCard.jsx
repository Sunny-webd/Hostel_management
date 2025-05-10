import React, { useState } from "react";

const MaintenanceCard = ({ request }) => {
  const [resolved, setResolved] = useState(request.status === "Resolved");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition w-full max-w-md">
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-800 dark:text-white">
          Issue: <span className="font-normal">{request.details}</span>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Priority:</strong> <span className="text-red-500">{request.priority}</span>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Status:</strong>{" "}
          <span className={request.status==="Resolved"? "text-green-500 font-semibold" : "text-yellow-500 font-semibold"}>
            {request.status==="Resolved" ? "Resolved" : "Pending"}
          </span>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Created On:</strong> {request.createdOn}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Updated At:</strong> {request.updatedAt}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className={`px-4 py-2 text-white font-medium rounded-lg transition duration-300 ${
            resolved ? "bg-green-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => setResolved(true)}
          disabled={resolved}
        >
          {resolved ? "Resolved" : "Mark Resolved"}
        </button>
      </div>
    </div>
  );
};

export default MaintenanceCard;

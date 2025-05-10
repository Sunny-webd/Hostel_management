import React from "react";

const RequestCard = ({ request }) => {
  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <strong className="text-gray-700">STATUS</strong>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            request.status.toLowerCase() === "resolved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {request.status}
        </span>
      </div>
      <div className="mb-3">
        <p className="text-gray-700 font-medium">
          <strong>Request:</strong> {request.details}
        </p>
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex flex-col">
          <span className="mb-3 text-gray-500 font-semibold">Priority</span>
          <span
            className={`px-3 py-2 rounded-full font-medium ${
              request.priority.toLowerCase() === "high"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {request.priority}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="mb-3 text-gray-500 font-semibold">Assigned To</span>
          <span className="bg-gray-100 text-center text-gray-700 px-3 py-2 rounded-full font-medium">
            {request.assigned_to || "Not Assigned"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;

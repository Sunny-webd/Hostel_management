import React from 'react'
import { motion } from 'framer-motion'
import '../components/Dashboard.css'

const StaffCard = ({staff}) => {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-lg font-semibold capitalize">
              {staff.full_name[0]}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 capitalize">{staff.full_name}</h3>
            <p className="text-sm text-gray-500">{staff.role}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          staff.status === 'true' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {staff.status ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  )
}

export default StaffCard

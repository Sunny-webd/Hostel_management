import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - fixed width, full height */}
      <div className="fixed left-0 top-0 h-full w-64 z-30">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-64"> {/* ml-64 to offset sidebar width */}
        {/* Navbar - fixed at top */}
        <div className="fixed top-0 right-0 left-64 z-20">
          <Navbar />
        </div>

        {/* Main content - scrollable, with proper padding */}
        <div className="pt-16 px-6 pb-6 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 
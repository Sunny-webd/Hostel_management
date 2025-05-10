import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import RM from './Components/RM'
import Addition from './Components/Addition';
import Chart from './Components/Chart';
import Inforoom from './Components/Inforoom'
import SM from './Components/SM'
import Staff_info from './Pannels/Staff_info'
import Maintainance from './Components/Maintainance'
// import Revenue from './Components/Revenue';
import Staffadd from './Components/Staffadd'

// Layout component for pages that need Navbar and Sidebar
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <DashboardLayout>{children}</DashboardLayout>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public route - Login page without Navbar and Sidebar */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes - with Navbar and Sidebar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Hostel-Management"
          element={
            <ProtectedRoute>
              <RM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Addition"
          element={
            <ProtectedRoute>
              <Addition />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chart/:hostelID"
          element={
            <ProtectedRoute>
              <Chart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inforoom/:RoomID"
          element={
            <ProtectedRoute>
              <Inforoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Staff-Management"
          element={
            <ProtectedRoute>
              <SM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff_info/:id"
          element={
            <ProtectedRoute>
              <Staff_info />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Maintainance"
          element={
            <ProtectedRoute>
              <Maintainance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Staffadd"
          element={
            <ProtectedRoute>
              <Staffadd />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route
          path="/"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all other routes and redirect to dashboard if authenticated */}
        <Route
          path="*"
          element={
            localStorage.getItem('token') ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

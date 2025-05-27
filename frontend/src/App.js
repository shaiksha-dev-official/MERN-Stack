import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import ErrorPage from './Components/ErrorPage';
import LeaveForm from './EmployeeComponents/LeaveForm';
import WfhForm from './EmployeeComponents/WfhForm';
import EditWfhForm from './EmployeeComponents/EditWfhForm';
import EditLeaveForm from './EmployeeComponents/EditLeaveForm';
import Signup from './Components/Signup';
import LoginPage from './Components/Login';
import EmployeeNavbar from './EmployeeComponents/EmployeeNavbar';
import LeaveRequest from './ManagerComponents/LeaveRequest';
import WfhRequest from './ManagerComponents/WfhRequest';
import ManagerNavbar from './ManagerComponents/ManagerNavbar';
import EmployeeList from './ManagerComponents/EmployeeList';
import ViewWfh from './EmployeeComponents/ViewWfh';
import ViewLeave from './EmployeeComponents/ViewLeave';
import HomePage from './Components/HomePage';
import ProtectedRoute from './Components/ProtectedRoute';
import RedirectIfAuthenticated from './Components/RedirectIfAuthenticated';

const AppContent = () => {
  const location = useLocation();

  const isEmployeePage = location.pathname.startsWith('/employee');
  const isManagerPage = location.pathname.startsWith('/manager');

  // Mock authentication and role data
  const isAuthenticated = !!sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user')) || {};
  const role = user.role || '';

  return (
    <div>
      {isEmployeePage && <EmployeeNavbar />}
      {isManagerPage && <ManagerNavbar />}
      
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="*" element={<ErrorPage />} />
       
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/login" element={<RedirectIfAuthenticated element={LoginPage} isAuthenticated={isAuthenticated} />} />
        <Route exact path="/employee/home" element={<ProtectedRoute element={HomePage} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Employee']} />} />
        <Route exact path="/manager/home" element={<ProtectedRoute element={HomePage} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Manager']} />} />
        
        {/* Employee Components */}
        <Route exact path="/employee/leaveform" element={<ProtectedRoute element={LeaveForm} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Employee']} />} />
        <Route exact path="/employee/wfhform" element={<ProtectedRoute element={WfhForm} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Employee']} />} />
        <Route exact path="/employee/viewWfh" element={<ProtectedRoute element={ViewWfh} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Employee']} />} />
        <Route exact path="/employee/viewleave" element={<ProtectedRoute element={ViewLeave} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Employee']} />} />
        <Route exact path="/employee/editWfh" element={<ProtectedRoute element={EditWfhForm} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Employee']} />} />
        <Route exact path="/employee/editLeave" element={<ProtectedRoute element={EditLeaveForm} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Employee']} />} />

        {/* Manager Components */}
        <Route exact path="/manager/leaverequest" element={<ProtectedRoute element={LeaveRequest} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Manager']} />} />
        <Route exact path="/manager/wfhrequest" element={<ProtectedRoute element={WfhRequest} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Manager']} />} />
        <Route exact path="/manager/employeelist" element={<ProtectedRoute element={EmployeeList} isAuthenticated={isAuthenticated} role={role} allowedRoles={['Manager']} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

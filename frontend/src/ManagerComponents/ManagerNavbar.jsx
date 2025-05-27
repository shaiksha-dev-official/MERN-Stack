import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../ManagerComponents/ManagerNavbar.css';

function ManagerNavbar() {
  

  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/manager/home');
  };

  const handleListEmployees = () => {
    navigate('/manager/employeelist');
  };

  const handleWfhRequest = () => {
    navigate('/manager/wfhrequest');
  };

  const handleLeaveRequest = () => {
    navigate('/manager/leaverequest');
  };


  
  const handleLogoClick = () => {
    setShowUserPopup(!showUserPopup);
  };
  const handleLogoutClick = () => {
    setShowLogoutPopup(true); // Show the logout confirmation popup
  };
  const handleConfirmLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };
  const handleCancelLogout = () => {
    setShowLogoutPopup(false); // Close the logout confirmation popup
  };

  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <div className="App">
      <header className="header">
        <div className="logo">WORKBUDDY</div>
        <div className="buttons">
          <img src='https://cdn-icons-png.flaticon.com/512/3090/3090108.png' className='im' alt="Employee Logo" onClick={handleLogoClick} />
          <button className='home' onClick={handleHomeClick}>Home</button>
          <button className='emp' onClick={handleListEmployees}>Employees</button>
          <button className='WFH' onClick={handleWfhRequest}>WFH Request</button>
          <button className='leave' onClick={handleLeaveRequest}>Leave Request</button>
          <button className="www" onClick={handleLogoutClick}>Logout</button>
        </div>
      </header>
      {showUserPopup && user && (
        <div className="user-popup">
          <p>Name: {user.userName}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      {showLogoutPopup && (
        <div className="logout-popup">
          <p>Are you sure you want to logout?</p>
          <button className="confirm-logout" onClick={handleConfirmLogout}>Yes, Logout</button>
          <button className="cancel-logout" onClick={handleCancelLogout}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManagerNavbar;

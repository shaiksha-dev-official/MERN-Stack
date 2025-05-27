import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../EmployeeComponents/EmployeeNavbar.css';
function EmployeeNavbar() {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const handleWFHClick = () => {
    setShowPopup1(!showPopup1);
    setShowPopup2(false); // Ensure Leave popup is closed
  };
  const handleLeaveClick = () => {
    setShowPopup2(!showPopup2);
    setShowPopup1(false); // Ensure WFH popup is closed
  };
  const handleHomeClick = () => {
    navigate('/employee/home');
  };
  const handleApplyWFHClick = () => {
    navigate('/employee/wfhform');
    setShowPopup1(false);
  };
  const handleMyWFHHistoryClick = () => {
    navigate('/employee/viewWfh');
    setShowPopup1(false);
  };
  const handleApplyLeaveClick = () => {
    navigate('/employee/leaveform');
    setShowPopup2(false);
  };
  const handleMyLeaveHistoryClick = () => {
    navigate('/employee/viewleave');
    setShowPopup2(false);
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
    <>
      <div className="App">
        <header className="header">
          <div className="logo">WORKBUDDY</div>
          <div className="buttons">
            <img src='https://cdn-icons-png.flaticon.com/512/3090/3090108.png' className='im' alt="Employee Logo" onClick={handleLogoClick} />
            <div className="button-container">
              <button className='home' onClick={handleHomeClick}>Home</button>
            </div>
            <div className="button-container">
              <button className='WFH' onClick={handleWFHClick}>WFH</button>
              {showPopup1 && (
                <div className="popup">
                  <button onClick={handleApplyWFHClick}>Apply WFH</button>
                  <button onClick={handleMyWFHHistoryClick}>My WFH History</button>
                </div>
              )}
            </div>
            <div className="button-container">
              <button className='leave' onClick={handleLeaveClick}>Leave</button>
              {showPopup2 && (
                <div className="popup">
                  <button onClick={handleApplyLeaveClick}>Apply Leave</button>
                  <button onClick={handleMyLeaveHistoryClick}>My Leave History</button>
                </div>
              )}
            </div>
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
    </>
  );
}
export default EmployeeNavbar;
import React, { useState, useEffect } from 'react';
import '../EmployeeComponents/LeaveForm.css';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import axios from 'axios';

const EditLeaveForm = () => {
  const [formState, setFormState] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    leaveType: '',
    file: '',
    errors: {}
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const  {requestId}  = location.state;

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`http://localhost:5000/leave/getLeaveRequestById/${requestId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const { startDate, endDate, reason,leaveType,file } = response.data;
        setFormState({ startDate, endDate, reason,leaveType,file, errors: {}, showPopup: false });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequestData();
  }, [requestId]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState({
        ...formState,
        file: reader.result 
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { startDate, endDate, reason, leaveType, file } = formState;
    let errors = {};

    if (!startDate) errors.startDate = "Start Date is required";
    if (!endDate) errors.endDate = "End Date is required";
    if (!reason) errors.reason = "Reason is required";
    if (!leaveType) errors.leaveType = "Leave Type is required";
    if (!file) errors.attachment = "File is required";

    if (Object.keys(errors).length === 0) {
      try {
        const token = sessionStorage.getItem('token');
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;

        if (typeof userId !== 'string') {
          throw new Error("userId must be a string");
        }

        await axios.put(`http://localhost:5000/leave/updateLeaveRequest/${requestId}`, 
          { startDate, endDate, reason, status: 'Pending', leaveType, file, userId },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        setFormState({ ...formState, showPopup: true });
      } catch (error) {
        console.error("Error storing data:", error);
      }
    } else {
      setFormState({ ...formState, errors });
    }
  };

  const handleOkClick = () => {
    navigate('/employee/viewleave', { state: { refresh: true } });
  };

  const { errors, showPopup } = formState;
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="leave-request-form">
      <h2>Edit Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date<span className="required-asterisk">*</span></label>
          <input 
            type="date" 
            id="startDate" 
            name="startDate" 
            placeholder="dd-mm-yyyy" 
            min={currentDate} // Set min attribute to current date
            value={formState.startDate} 
            onChange={handleChange}  
          />
          {errors.startDate && <span className="error">{errors.startDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date<span className="required-asterisk">*</span></label>
          <input 
            type="date" 
            id="endDate" 
            name="endDate" 
            placeholder="dd-mm-yyyy" 
            value={formState.endDate} 
            min={formState.startDate || currentDate}
            onChange={handleChange}  
          />
          {errors.endDate && <span className="error">{errors.endDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason<span className="required-asterisk">*</span></label>
          <textarea 
            id="reason" 
            name="reason" 
            value={formState.reason} 
            onChange={handleChange}  
          />
          {errors.reason && <span className="error">{errors.reason}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type<span className="required-asterisk">*</span></label>
          <select 
            id="leaveType" 
            name="leaveType" 
            value={formState.leaveType} 
            onChange={handleChange} 
          >
            <option value="">Select Type</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="annual">Annual Leave</option>
          </select>
          {errors.leaveType && <span className="error">{errors.leaveType}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="attachment">Attachment<span className="required-asterisk">*</span></label>
          <input 
            type="file" 
            id="attachment" 
            name="attachment" 
            onChange={handleFileChange}  
          />
          {errors.attachment && <span className="error">{errors.attachment}</span>}
        </div>
        <button type="submit">Add Request</button>
      </form>
      {showPopup && (
        <div className="leafpopup">
          <div className="leaf-popup-content">
            <p>Successfully Updated</p>
            <button onClick={handleOkClick}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLeaveForm;

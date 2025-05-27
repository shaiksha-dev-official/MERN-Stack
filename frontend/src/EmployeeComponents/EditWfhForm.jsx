import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../EmployeeComponents/WfhForm.css';

const EditWfhForm = () => {
  const [formState, setFormState] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    errors: {},
    showPopup: false
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
        const response = await axios.get(`http://localhost:5000/wfh/getWfhRequestById/${requestId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const { startDate, endDate, reason } = response.data;
        setFormState({ startDate, endDate, reason, errors: {}, showPopup: false });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { startDate, endDate, reason } = formState;
    let errors = {};

    if (!startDate) errors.startDate = "Start Date is required";
    if (!endDate) errors.endDate = "End Date is required";
    if (!reason) errors.reason = "Reason is required";

    if (Object.keys(errors).length === 0) {
      try {
        const token = sessionStorage.getItem('token');
      
  
       
        if (!token) {
          throw new Error("No token found");
        }

        await axios.put(`http://localhost:5000/wfh/updateWfhRequest/${requestId}`, 
          { startDate, endDate, reason },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        setFormState({ ...formState, showPopup: true });
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      setFormState({ ...formState, errors });
    }
  };

  const handleOkClick = () => {
    navigate('/employee/viewWfh', { state: { refresh: true } });
  };

  const { errors, showPopup } = formState;
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="wfh-form">
      <h2>Edit WFH Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="startDate">Start Date <span className="required-asterisk">*</span></label>
          <input 
            type="date" 
            id="startDate" 
            name="startDate" 
            placeholder="dd-mm-yyyy" 
            min={currentDate} 
            value={formState.startDate} 
            onChange={handleChange}  
          />
          {errors.startDate && <span className="error">{errors.startDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date <span className="required-asterisk">*</span></label>
          <input 
             type="date"
             id="endDate"
             name="endDate"
             placeholder="dd-mm-yyyy"
             min={formState.startDate || currentDate} // Set min attribute based on start date or current date
             value={formState.endDate}
             onChange={handleChange}
          />
          {errors.endDate && <span className="error">{errors.endDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason <span className="required-asterisk">*</span></label>
          <textarea 
            id="reason" 
            name="reason" 
            value={formState.reason} 
            onChange={handleChange}  
          />
          {errors.reason && <span className="error">{errors.reason}</span>}
        </div>
        <button type="submit">Update Request</button>
      </form>
      {showPopup && (
        <div className="wfhpopup">
          <div className="wfh-popup-content">
            <p>Updated Successfully</p>
            <button onClick={handleOkClick}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWfhForm;

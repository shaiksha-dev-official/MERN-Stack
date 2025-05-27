import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState({});
  const navigate = useNavigate();
 
  const validate = () => {
    let temp = {};
    temp.userName = userName ? "" : "User Name is required";
    temp.email = email ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Email is not valid.") : "Email is required";
    temp.mobile = mobile ? (/^[0-9]{10}$/.test(mobile) ? "" : "Mobile number is not valid.") : "Mobile Number is required";
    temp.password = password ? "" : "Password is required";
    temp.confirmPassword = confirmPassword ? (password === confirmPassword ? "" : "Passwords do not match") : "Confirm Password is required";
    temp.role = role ? "" : "This field is required.";
    setError({ ...temp });
    return Object.values(temp).every(x => x === "");
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/user/signup', { userName, email, mobile, password, role });
        if (response.status === 200) {
          toast.success('Registration successful! Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 3000); // Delay to show the toast before redirecting
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Assuming the server returns 409 status code for conflicts such as existing username or email
          toast.error('There was an error registering the user!');
        } else {
          toast.error("Username or Email already exists. Please choose a different one.");
        }
        console.error("There was an error registering the user!", error);
      }
    }
  };
 
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setError({ ...error, [e.target.name]: "" });
  };
 
  return (
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-5 d-none d-lg-block">
          <img src='https://cdn.dribbble.com/users/942818/screenshots/13870194/media/1cf495802d5a5497bf4551270edc1ab0.jpg?resize=1200x900&vertical=center' alt="Signup" style={{ height: '500px', width: '100%' }} className="img-fluid" />
        </div>
        <div className="col-lg-7 col-md-8 col-sm-10 col-12">
          <h1 className="text-center mb-4 text-dark" style={{fontFamily: "monospace"}}>Signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="userName" style={{fontWeight: 600}}>User Name</label>
                <input
                  type="text"
                  className={`form-control ${error.userName ? 'is-invalid' : ''}`}
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={handleChange(setUserName)}
                />
                <div className="invalid-feedback">{error.userName}</div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="email" style={{fontWeight: 600}}>Email Address</label>
                <input
                  type="email"
                  className={`form-control ${error.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange(setEmail)}
                />
                <div className="invalid-feedback">{error.email}</div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="mobile" style={{fontWeight: 600}}>Mobile Number</label>
                <input
                  type="text"
                  className={`form-control ${error.mobile ? 'is-invalid' : ''}`}
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={handleChange(setMobile)}
                />
                <div className="invalid-feedback">{error.mobile}</div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label htmlFor="password" style={{fontWeight: 600}}>Password</label>
                <input
                  type="password"
                  className={`form-control ${error.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange(setPassword)}
                  placeholder='Password'
                />
                <div className="invalid-feedback">{error.password}</div>
              </div>
              <div className="col-6">
                <label htmlFor="confirmPassword" style={{fontWeight: 600}}>Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${error.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange(setConfirmPassword)}
                  placeholder='Confirm Password'
                />
                <div className="invalid-feedback">{error.confirmPassword}</div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="role" style={{fontWeight: 600}}>Role</label>
                <select
                  className={`form-control ${error.role ? 'is-invalid' : ''}`}
                  id="role"
                  name="role"
                  value={role}
                  onChange={handleChange(setRole)}
                >
                  <option value="">Select Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
                <div className="invalid-feedback">{error.role}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block mt-1">Submit</button>
                <p className="mt-3 text-center">
                  Already have an account? <Link to='/login'>Click here to Sign in</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default Signup;
 
 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeList.css';
const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    // Fetch employee data from backend API using Axios when the component mounts
    const fetchEmployees = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get('http://localhost:5000/user/getAllEmployees',{
        headers: { 'Authorization': `Bearer ${token}` },
      })
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchEmployees();
  }, []);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredEmployees = employees.filter((employee) =>
    employee.userName && employee.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="container mt-4">
      <h2 className="text-primary">View Employees</h2>
      <div className='manager-employee-list'>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="table table-striped table-bordered">
        <thead className="bg-primary text-light">
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.userName}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeList;
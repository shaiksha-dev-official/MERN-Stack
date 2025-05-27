import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Pagination } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const LeaveRequest = () => {
    const [show, setShow] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 5; // Number of requests to display per page
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found");
                }
                const response = await axios.get('http://localhost:5000/leave/getAllLeaveRequests', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data && response.data.leaveRequests) {
                    setRequests(response.data.leaveRequests);
                } else {
                    setRequests([]);  // Set to empty array if the expected data is not present
                }
            } catch (error) {
                console.error('Error fetching leave requests:', error);
                setRequests([]);  // Set to empty array in case of error
            }
        };
        fetchRequests();
    }, []);
    const updateRequestStatus = async (requestId, status) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            await axios.put(`http://localhost:5000/leave/updateLeaveRequest/${requestId}`, {
                status
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setRequests(prevRequests =>
                prevRequests.map(req =>
                    req._id === requestId ? { ...req, status } : req
                )
            );
        } catch (error) {
            console.error(`Error updating leave request to ${status}:`, error);
        }
    };
    const handleApprove = (requestId) => updateRequestStatus(requestId, 'Approved');
    const handleReject = (requestId) => updateRequestStatus(requestId, 'Rejected');
    const handleShowMore = (request) => {
        setSelectedRequest(request);
        setShow(true);
    };

    const handleClose = () => setShow(false);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
    const filteredRequests = requests.filter((request) => {
        const matchesSearch = request.userId.userName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === '' || request.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    // Pagination logic
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
    const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
    const handleClick = (pageNumber) => setCurrentPage(pageNumber);
    const renderPagination = () => {
        const paginationItems = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handleClick(i)}>
                    {i}
                </Pagination.Item>
            );
        }
        return (
            <Pagination>
                <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} />
                {paginationItems}
                <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
        );
    };
    return (
        <div className="container mt-4">
            <p className='invisible'>Logout</p>
            <h2 className="text-center">Leave Requests for Approval</h2>
            <div className="d-flex justify-content-between mb-3">
                <Form.Control type="text" placeholder="Search..." className="w-50 mr-2" value={searchTerm}
                    onChange={handleSearchChange} />
                <Form.Control as="select" className="w-25" value={statusFilter}
                    onChange={handleStatusFilterChange}>
                    <option value="">Filter by Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                </Form.Control>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='bg-primary'>Username</th>
                        <th className='bg-primary'>Start Date</th>
                        <th className='bg-primary'>End Date</th>
                        <th className='bg-primary'>Reason</th>
                        <th className='bg-primary'>Created On</th>
                        <th className='bg-primary'>Status</th>
                        <th className='bg-primary'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequests.length > 0 ? (
                        currentRequests.map((request, index) => (
                            <tr key={index}>
                                <td>{request.userId.userName}</td>
                                <td>{request.startDate}</td>
                                <td>{request.endDate}</td>
                                <td>{request.reason}</td>
                                <td>{request.createdOn}</td>
                                <td>{request.status}</td>
                                <td className='d-flex flex-row'>
                                    <Button className='m-1' variant="primary" size="sm" onClick={() => handleShowMore(request)}>Show More</Button>
                                    {request.status !== 'Approved' && request.status !== 'Rejected' && (
                                        <>
                                            <Button className='m-1' variant="success" size="sm" onClick={() => handleApprove(request._id)}>Approve</Button>
                                            <Button className='m-1' variant="danger" size="sm" onClick={() => handleReject(request._id)}>Reject</Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No leave requests available.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {renderPagination()}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Additional Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRequest ? (
                        <>
                            <p><strong>Username:</strong> {selectedRequest.userId.userName}</p>
                            <p><strong>Email:</strong> {selectedRequest.userId.email}</p>
                            <p><strong>Mobile:</strong> {selectedRequest.userId.mobile}</p>
                            <p><strong>Start Date:</strong> {selectedRequest.startDate}</p>
                            <p><strong>End Date:</strong> {selectedRequest.endDate}</p>
                            <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                            <p><strong>Status:</strong> {selectedRequest.status}</p>
                            <p><strong>Medical Certificate:</strong></p>
                            <img src={selectedRequest.file} alt="Medical Certificate" className="img-fluid" />
                        </>
                    ) : (
                        <p>No details available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};
export default LeaveRequest;

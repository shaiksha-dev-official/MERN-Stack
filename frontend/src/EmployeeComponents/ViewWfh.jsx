 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewWfh.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
const ViewWfh = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('createdOn');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const requestsPerPage = 2;
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const user = JSON.parse(sessionStorage.getItem('user'));
                const userId = user.id;
                if (!token || !userId) {
                    throw new Error("No token or user ID found");
                }
                const response = await axios.get(`http://localhost:5000/wfh/getWfhRequestsByUserId/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const fetchedRequests = response.data.wfhRequests || [];
                setRequests(fetchedRequests);
                setTotalPages(Math.ceil(fetchedRequests.length / requestsPerPage));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchRequests();
    }, [location.state]);
    const handleEdit = (id) => {
        navigate('/employee/editwfh', { state: { requestId: id } });
    };
    const handleDelete = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error("No token found");
            }
            await axios.delete(`http://localhost:5000/wfh/deleteWfhRequest/${deleteId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const updatedRequests = requests.filter(request => request._id !== deleteId);
            setRequests(updatedRequests);
            setTotalPages(Math.ceil(updatedRequests.length / requestsPerPage));
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    const handleSortChange = (e) => {
        const [sortField, sortDirection] = e.target.value.split('_');
        setSortBy(sortField);
        setSortOrder(sortDirection);
        setCurrentPage(1);
    };
    const openModal = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const filteredRequests = requests.filter((request) =>
        request.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedRequests = filteredRequests.sort((a, b) => {
        if (sortOrder === 'asc') {
            return new Date(a[sortBy]) - new Date(b[sortBy]);
        } else {
            return new Date(b[sortBy]) - new Date(a[sortBy]);
        }
    });
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = sortedRequests.slice(indexOfFirstRequest, indexOfLastRequest);
    return (
        <div className="container mt-5">
            <p className='invisible'>Logout</p>
            <h2 className="text-center text-primary">Work From Home Requests</h2>
            <div className="d-flex justify-content-between my-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search by Reason"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select className="form-select w-25" onChange={handleSortChange}>
                    <option value="createdOn_asc">Sort by Created On (Asc)</option>
                    <option value="createdOn_desc">Sort by Created On (Desc)</option>
                    <option value="startDate_asc">Sort by Start Date (Asc)</option>
                    <option value="startDate_desc">Sort by Start Date (Desc)</option>
                </select>
            </div>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>S.No</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Created On</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequests.length > 0 ? currentRequests.map((request, index) => (
                        <tr key={request._id}>
                            <td>{(currentPage - 1) * requestsPerPage + index + 1}</td>
                            <td>{new Date(request.startDate).toLocaleDateString()}</td>
                            <td>{new Date(request.endDate).toLocaleDateString()}</td>
                            <td>{request.reason}</td>
                            <td>{request.status}</td>
                            <td>{new Date(request.createdOn).toLocaleDateString()}</td>
                            <td className='d-flex flex-row'>
                                <button className="btn btn-primary btn-sm m-2" onClick={() => handleEdit(request._id)}>Edit</button>
                                <button className="btn btn-danger btn-sm m-2" onClick={() => openModal(request._id)}>Delete</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7" className="text-center">No requests found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={handlePreviousPage} className="page-link">
                            Prev
                        </button>
                    </li>
                    <li className="page-item">
                        <span className="page-link">
                            {currentPage} / {totalPages}
                        </span>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button onClick={handleNextPage} className="page-link">
                            Next
                        </button>
                    </li>
                </ul>
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this WFH request?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ViewWfh;
const LeaveRequest = require('../models/leaveRequestModel');
const mongoose = require('mongoose');
const getAllLeaveRequests = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdOn', sortOrder = 'desc', search = '' } = req.query;
 
        const searchQuery = {
            $or: [
                { employeeName: { $regex: search, $options: 'i' } },
                { reason: { $regex: search, $options: 'i' } }
            ]
        };
        const skip = (page - 1) * limit;
        const leaveRequests = await LeaveRequest.find(searchQuery).populate('userId')
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(parseInt(limit));
        const totalRequests = await LeaveRequest.find(searchQuery).countDocuments();
        res.status(200).json({
            leaveRequests,
            totalRequests,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalRequests / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLeaveRequestById = async (req, res) => {
   try {
       const leaveRequest = await LeaveRequest.findById(req.params.id);
       if (!leaveRequest) {
           return res.status(404).json({ message: 'Leave request not found' });
       }
       res.status(200).json(leaveRequest);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

const addLeaveRequest = async (req, res) => {
    try {
        const { userId, startDate, endDate, reason,leaveType, status, file } = req.body;
    
        // Ensure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
    
        const request = new LeaveRequest({
          userId,
          startDate,
          endDate,
          reason,
          leaveType,
          status,
          file
    });
    
        await request.save();
        res.status(200).json({message:"Successfully added"});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

const updateLeaveRequest = async (req, res) => {
   try {
       const leaveRequest = await LeaveRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!leaveRequest) {
           return res.status(404).json({ message: 'Leave request not found' });
       }
       res.status(200).json({ message: 'Leave Request Updated Successfully', leaveRequest });
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

const getLeaveRequestsByUserId = async (req, res) => {
   try {
    const userId = req.params.id;
       const requests = await LeaveRequest.find({ userId});
       res.status(200).json({leaveRequests:requests});
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

const deleteLeaveRequest = async (req, res) => {
   try {
       const leaveRequest = await LeaveRequest.findByIdAndDelete(req.params.id);
       if (!leaveRequest) {
           return res.status(404).json({ message: 'Leave request not found' });
       }
       res.status(200).json({ message: 'Leave Request Deleted Successfully' });
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};
module.exports = {
   getAllLeaveRequests,
   getLeaveRequestById,
   addLeaveRequest,
   updateLeaveRequest,
   getLeaveRequestsByUserId,
   deleteLeaveRequest
};
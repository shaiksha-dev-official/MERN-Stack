const WFH = require('../models/wfhRequestModel');
const mongoose = require('mongoose');

// const getAllWfhRequests = async (req, res) => {
//     try {
//         const { page = 1, limit = 10, sortBy = 'createdOn', sortOrder = 'asc', search = '' } = req.query;
 
//         const searchQuery = {
//             $or: [
//                 { employeeName: { $regex: search, $options: 'i' } },
//                 { reason: { $regex: search, $options: 'i' } }
//             ]
//         };
//         const skip = (page - 1) * limit;
//         const wfhRequests = await WFH.find(searchQuery).populate('userId')
//             .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
//             .skip(skip)
//             .limit(parseInt(limit));
//         const totalRequests = await WFH.find(searchQuery).countDocuments();
//         res.status(200).json({
//             wfhRequests,
//             totalRequests,
//             currentPage: parseInt(page),
//             totalPages: Math.ceil(totalRequests / limit)
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
const getAllWfhRequests = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdOn', sortOrder = 'desc', search = '' } = req.query;
        let searchQuery = {};
        if (search) {
            searchQuery = {
                $or: [
                    { employeeName: { $regex: search, $options: 'i' } },
                    { reason: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const skip = (page - 1) * limit;
        const wfhRequests = await WFH.find(searchQuery).populate('userId')
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(parseInt(limit));
        const totalRequests = await WFH.countDocuments(searchQuery);
        res.status(200).json({
            wfhRequests,
            totalRequests,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalRequests / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getWfhRequestById = async (req, res) => {
    try {
        const request = await WFH.findById(req.params.id);
        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).send("not found");
        }

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
const getWfhRequestsByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Correctly extract userId from req.params
        const requests = await WFH.find({ userId }); // Use the correct method to query the database
        res.status(200).json({ wfhRequests: requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addWfhRequest = async (req, res) => {
    try {
      const { userId, startDate, endDate, reason, status } = req.body;
  
      // Ensure userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(500).json({ message: "Invalid userId" });
      }
  
      const request = new WFH({
        userId,
        startDate,
        endDate,
        reason,
        status,
    });
  
      await request.save();
      return res.status(200).json({message:"Successfully added"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const updateWfhRequest = async (req, res) => {
    try {
        const request = await WFH.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).json("not found");
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteWfhRequest = async (req, res) => {
    try {
        const request = await WFH.findByIdAndDelete(req.params.id);
        if (request) {
            res.status(200).json("successful deletion");
        } else {
            res.status(404).json("not found");
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { getAllWfhRequests, getWfhRequestById, getWfhRequestsByUserId, addWfhRequest, updateWfhRequest, deleteWfhRequest };


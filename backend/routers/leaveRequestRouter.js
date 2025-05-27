const express = require('express')
const leaveRequestController = require('../controllers/leaveRequestController');
const { validateToken } = require('../authUtils');
const {validateLeaveReq} = require('../utils/validationSchema')
const router = express.Router()

const validateLeaveReqMiddleware = (req, res, next) => {
    const { error } = validateLeaveReq(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };


router.post('/addLeaveRequest', validateToken, validateLeaveReqMiddleware, leaveRequestController.addLeaveRequest);
router.get('/getAllLeaveRequests', validateToken, leaveRequestController.getAllLeaveRequests);
router.post('/getAllLeaveRequests', validateToken, leaveRequestController.getAllLeaveRequests);
router.get('/getLeaveRequestById/:id', validateToken, leaveRequestController.getLeaveRequestById);
router.put('/updateLeaveRequest/:id', validateToken, leaveRequestController.updateLeaveRequest);
router.get('/getLeaveRequestsByUserId/:id', validateToken, leaveRequestController.getLeaveRequestsByUserId);
router.delete('/deleteLeaveRequest/:id', validateToken, leaveRequestController.deleteLeaveRequest);

module.exports = router;

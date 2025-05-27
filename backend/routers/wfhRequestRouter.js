const express = require('express')
const wfhRequestController = require('../controllers/wfhRequestController');

const { validateToken } = require('../authUtils');
const { validateWfhRequest } = require('../utils/validationSchema');
const router = express.Router()

const validateWfhReqMiddleware = (req, res, next) => {
    const { error } = validateWfhRequest(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };

router.post('/addWfhRequest', validateToken, validateWfhReqMiddleware,  wfhRequestController.addWfhRequest);
router.get('/getAllWfhRequests', validateToken, wfhRequestController.getAllWfhRequests);
router.post('/getAllWfhRequests', validateToken, wfhRequestController.getAllWfhRequests);
router.get('/getWfhRequestById/:id', validateToken, wfhRequestController.getWfhRequestById);
router.get('/getWfhRequestsByUserId/:id', validateToken, wfhRequestController.getWfhRequestsByUserId);
router.put('/updateWfhRequest/:id', validateToken, wfhRequestController.updateWfhRequest);
router.delete('/deleteWfhRequest/:id', validateToken, wfhRequestController.deleteWfhRequest);

module.exports = router;

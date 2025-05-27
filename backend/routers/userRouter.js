const express=require('express')
const userController=require('../controllers/userController');
const { validateToken } = require('../authUtils');
const { validateUser } = require('../utils/validationSchema');



const router=express.Router();

const validateUserMiddleware = (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };

router.post('/signup', validateUserMiddleware, userController.addUser);
router.post('/login',userController.getUserByEmailAndPassword);
router.get('/getAllEmployees', validateToken, userController.getAllEmployees);

module.exports=router;
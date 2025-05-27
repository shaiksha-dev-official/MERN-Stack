const User = require('../models/userModel');
const { generateToken } = require('../authUtils');
const bcrypt = require('bcryptjs');


const getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = await User.findOne({ email: email });
    const user = await User.findOne({ email: email});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.userName, user.role);

    req.session.user = {
      id: user._id.toString(),
      userName: user.userName,
      role: user.role,
      token: token,
    };

    res.status(200).json({
      data: [{
        isAuthenticated: true,
        token: token
      }],
      status: 'Success',
      message: {
        message: "Login Successful"
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getUserByEmailAndPassword = async (req, res) => {
//   try {
//       const {email,password} = req.body
//       const user = await User.findOne({ email:email, password: password })
//       if (user) {
//           const token = generateToken(user._id, user.role);
//           const response = {
//               userName: user.userName,
//               role: user.role,
//               token: token,
//               id: user._id
//           };
//           res.status(200).json(response)
//       } else {
//           return res.status(404).json({ message: "User not found" });
//       }
//   } catch (error) {
//       res.status(500).json({ message: error.message })
//   }
// }

// Function to add a new user
const addUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { ...rest, password: hashedPassword };
    await User.create(newUser);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get all employees
const getAllEmployees = async (req, res) => {
  try {
    if (req.user.role === 'Manager') {
      const employees = await User.find({ role: 'Employee' });
      res.status(200).json(employees);
    } else {
      res.status(403).json({ message: 'Access denied. Only managers can view all employees.' });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserByEmailAndPassword,
  addUser,
  getAllEmployees,
};

// const User=require('../models/userModel')


// const {generateToken}=require('../authUtils')


// const getUserByEmailAndPassword = async (req, res) => {
//   try {
//     const { email,password } = req.body;
//     const user = await User.findOne({ email: email , password:password});
//     if (!user) {
//       return res.status(404).json({message:"User not found"
//         // data: [{
//         //   isAuthenticated: false,
//         //   token: ""
//         // }],
//         // status: 'fail',
//         // message: {
//         //   error: true,
//         //   errorMessage: "User Not found",
//         //   message: ""
//         // }
//       });
//     }
//     const token = generateToken(user._id,user.userName, user.role);


   
//     req.session.user = {
//       id: user._id.toString(),
//       userName: user.userName,
//       role: user.role,
//       token: token,
//     };
//     // console.log("session",req.sessionID);

    

//       res.status(200).json({
//       data: [{
//         isAuthenticated: true,
//         token: token
//       }],
//       status: 'Success',
//       message:{
//         message:"Login Successfull"
//       }
//   });
//   } catch (error) {
//     return res.status(500).json({message:"Internal Server Error"
//       // data: [{
//       //   isAuthenticated: false,
//       //   token: ''
//       // }],
//       // status: 'fail',
//       // message: {
//       //   error: true,
//       //   errorMessage: error.message,
//       //   message: ""
//       // }
//     });
//   }
// };



// const addUser = async (req, res) => {
//     try {
//       console.log(req.body)
//         await User.create(req.body);
//         res.status(200).json({ message: "Success" });
//     } catch (error) {
//       console.log(error)
//         res.status(500).json({message:"Internal Server Error"
          
//          });
//     }
// };

// const getAllEmployees = async (req, res) => {
//     try {
       
//         if (req.user.role === 'Manager') {
            
//             const employees = await User.find({ role: 'Employee' });
//             res.status(200).json(employees);
//         } else {
           
//             res.status(403).json({ message: 'Access denied. Only managers can view all employees.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message:"Internal Server Error"
         
//         });
//     }
// };


// module.exports={
//     getUserByEmailAndPassword,
//     addUser,
//     getAllEmployees,
// }
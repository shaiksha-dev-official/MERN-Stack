const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
const User = require('./models/userModel');
dotenv.config();
const secret=process.env.SECRET_KEY;
 
const generateToken = (userId, userName, role) => {
    const token = jwt.sign(
        { id: userId, userName, role },
        secret,
        { expiresIn: '1h' }
    );
    console.log('Generated Token:', token); // Log the generated token
    return token;
};
 


const validateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(400).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the header
    if (!token) {
        return res.status(400).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).send({ data: [], status: "fail", message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Token validation error:', error); // Log the error
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { validateToken,generateToken };

// const jwt=require("jsonwebtoken");

// const User = require('./models/userModel'); 
// const generateToken=(userId)=>{
//     return jwt.sign({id:userId},'asdfgewlnclnlhjkl',{expiresIn:'1h'})
// }



// const validateToken = async (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'your_secret_key');
//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid token.' });
//     }
// };



// const validateToken=(req,res,next)=>{
//     const token=req.header('Authorization')
//     if(!token)
//     return res.status(400).json({message:'Authentication failed'})
//     try {
//         const verified=jwt.verify(token,'asdfgewlnclnlhjkl')
//         req.user=verified
//         next();
//     } catch (error) {
//         res.status(400).json({message:'Authentication failed'})
//     }
// }

// module.exports={
//     generateToken,
//     validateToken,
// }
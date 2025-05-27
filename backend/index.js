require('dotenv').config();
const express = require('express');
const connectDb = require('./_config/db');
const userRouter = require('./routers/userRouter');
const leaveRequestRouter = require('./routers/leaveRequestRouter');
const wfhRequestRouter = require('./routers/wfhRequestRouter');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
app.use(express.json());
app.use(cors());



// Session configuration
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
      
    }),
   
}));
connectDb();
app.use('/user', userRouter);
app.use('/leave', leaveRequestRouter);
app.use('/wfh', wfhRequestRouter);



const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

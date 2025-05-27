const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    leaveType: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },

    file: {
        type: String,
        required: true
    }
})

LeaveRequestSchema.pre('save', function(next){
    if(!this.createdOn){
        this.createdOn = Date.now();
    }
    next();
})

const LeaveRequestModel = mongoose.model('LeaveRequestModel', LeaveRequestSchema);
module.exports = LeaveRequestModel;
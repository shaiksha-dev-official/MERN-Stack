const Joi = require('joi');
const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Types;

const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });

  return schema.validate(user);
};

const validateLeaveReq = (data) => {
    const schema = Joi.object({
      userId: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }).required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      reason: Joi.string().required(),
      leaveType: Joi.string().required(),
      status: Joi.string().required(),
      file: Joi.string().required(),
    });

   return schema.validate(data)
}


const validateWfhRequest = (data) => {
  const schema = Joi.object({
    userId: Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    reason: Joi.string().required(),
    status: Joi.string().required(),
  });
  return schema.validate(data);
};






module.exports = {
  validateUser,
  validateLeaveReq,
  validateWfhRequest
};

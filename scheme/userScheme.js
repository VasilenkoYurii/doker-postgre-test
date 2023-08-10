const joi = require("joi");

const createUserSchema = joi.object({
  username: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required(),
  role: joi.string().required(),
  state: joi.string().required(),
});

const updateUserSchema = joi.object({
  id: joi.number().required(),
  username: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required(),
  role: joi.string().required(),
  state: joi.string().required(),
});

module.exports = { createUserSchema, updateUserSchema };

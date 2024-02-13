const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateSignupInput = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  check('city').notEmpty().withMessage('City is required'),
  check('state').notEmpty().withMessage('State is required'),
  // Add other validations as necessary
  handleValidationErrors
];

module.exports = validateSignupInput;

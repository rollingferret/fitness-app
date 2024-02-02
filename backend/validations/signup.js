// File: signup.js

const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateSignupInput = [
  // Email validation
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address'),

  // Username validation
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long'),

  // Password validation
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),

  // Confirm password validation
  check('password2')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),

  handleValidationErrors
];

module.exports = validateSignupInput;

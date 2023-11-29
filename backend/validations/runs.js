const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateRunInput = [
  check('distance')
    .isNumeric().withMessage('Distance must be a number')
    .not().isEmpty().withMessage('Distance is required'),
  check('hours')
    .isNumeric().withMessage('Hours must be a number')
    .not().isEmpty().withMessage('Hours is required'),
  check('minutes')
    .isNumeric().withMessage('Minutes must be a number')
    .not().isEmpty().withMessage('Minutes is required'),
  check('seconds')
    .isNumeric().withMessage('Seconds must be a number')
    .not().isEmpty().withMessage('Seconds is required'),
  handleValidationErrors
];

module.exports = validateRunInput;

module.exports = validateRunInput;

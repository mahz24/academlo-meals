//Import libraries
const { body, validationResult } = require('express-validator');

//Utils
const { AppError } = require('../utils/AppError');

const createUserValidations = [
  body('username').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be emty')
    .isEmail()
    .withMessage('Emial not valid'),
  body('password')
    .notEmpty()
    .withMessage('passord connot be empty')
    .isLength({ min: 8 })
    .withMessage('Passwor must be at least 8 characters long'),
];

const checkValidatios = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msgs = errors.array().map(({ msg }) => msg);

    const errMsg = msgs.join('. ');

    return next(new AppError(errMsg, 400));
  }

  next();
};

module.exports = { checkValidatios, createUserValidations };
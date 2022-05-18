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

const createReviewValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('rating').notEmpty().withMessage('Rating connot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
];

const addMealValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().withMessage('Price cannot be empty'),
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

module.exports = {
  checkValidatios,
  createUserValidations,
  createReviewValidations,
  addMealValidations,
};

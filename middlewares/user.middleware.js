//Import libraries
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { verify } = require('jsonwebtoken');
//Models
const { User } = require('../models/user.model');

//Utils
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

//Dotenv configuration
dotenv.config({ path: './config.env' });

//Funtionc that verify if user exist
const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: 'password' },
  });

  if (!user) {
    return next(new AppError('User does not exist with given id', 404));
  }

  req.user = user;

  next();
});

//Funtion that check if there is a token
const tokenVerification = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Sesion invalid', 403));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is not longer avaliable', 403)
    );
  }

  req.sessionUser = user;

  next();
});

const protectUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  if (Number(id) !== sessionUser.id) {
    return next(new AppError('This action is not availible', 403));
  }

  next();
});

module.exports = { userExist, tokenVerification, protectUser };

//Utils
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

//Model
const { Restaurant } = require('../models/retaurant.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError('This restaurant not exist', 404));
  }

  req.restaurant = restaurant;

  next();
});

const validateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const review = await Review.findOne({
    where: { restaurantId: id, userId: sessionUser.id },
  });

  if (!review) {
    return next(new AppError('Review not found ', 404));
  }

  req.review = review;

  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const user = await User.findOne({
    where: { id: sessionUser.id, role: 'admin' },
  });

  if (!user) {
    return next(new AppError('You are not admin', 403));
  }
});

const protectRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError('This restaurant no exist', 403));
  }

  next();
});

module.exports = {
  restaurantExist,
  validateReview,
  protectAdmin,
  protectRestaurant,
};

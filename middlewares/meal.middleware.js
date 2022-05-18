//Models
const { Meal } = require('../models/meal.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id, status: 'active' } });

  if (!meal) {
    return next(new AppError('This meal is not avalible', 404));
  }

  req.meal = meal;

  next();
});

module.exports = { mealExist };

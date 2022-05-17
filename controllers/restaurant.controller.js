// Models
const { Restaurant } = require('../models/retaurant.model');

//Utils
const { AppError } = require('../utils/AppError');
const { catchAsync } = require('../utils/catchAsync');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.params;

  const newRes = await Restaurant.create({ name, address, rating });

  res.status(201).json({ newRes });
});

module.exports = { createRestaurant };

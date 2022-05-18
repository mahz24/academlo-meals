// Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRes = await Restaurant.create({
    name: name,
    address: address,
    rating: rating,
  });

  res.status(201).json({ newRes });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
    include: [{ model: Review }],
  });

  res.status(200).json({ restaurants });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id },
    include: [{ model: Review }],
  });

  res.status(200).json({ restaurant });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({ status: 'success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'inactive' });

  res.status(200).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser, restaurant } = req;

  const review = await Review.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  res.status(200).json({ review });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({ status: 'success' });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};

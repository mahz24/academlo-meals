//Models
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({ where: { id: mealId } });

  if (!meal) {
    return next(new AppError('Meal not found with given id'));
  }

  const totalPrice = quantity * meal.price;

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    price: totalPrice,
    quantity,
  });

  res.status(201).json({ newOrder });
});

const ordersUsers = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  console.log(sessionUser.id);

  const orders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: [{ model: Meal, include: [{ model: Restaurant }] }],
  });

  res.status(200).json({ orders });
});

const orderCompleted = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({ status: 'success' });
});

const OrderCancelled = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({ status: 'success' });
});

module.exports = { createOrder, ordersUsers, orderCompleted, OrderCancelled };

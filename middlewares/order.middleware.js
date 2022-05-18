//Models
const { Order } = require('../models/order.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id, status: 'active' } });

  if (!order) {
    return next(new AppError('Order are not active'));
  }

  req.order = order;

  next();
});

const protectOrder = catchAsync(async (req, res, next) => {
  const { order, sessionUser } = req;

  if (order.userId !== sessionUser.id) {
    return next(new AppError('You cannot do this action'));
  }

  next();
});

module.exports = { orderExist, protectOrder };

//Import libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');
const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/retaurant.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/AppError');

//Dotenv comfiguration
dotenv.config({ path: './config.env' });

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: username,
    email,
    password: hashPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({ status: 'success', newUser });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: 'active' } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.status(200).json({ token, user });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'inactive' });

  res.status(200).json({ status: 'success' });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: { userId: sessionUser.id, status: 'active' },
    include: [{ model: Meal, include: [{ model: Restaurant }] }],
  });

  res.status(200).json({ status: 'success', orders });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      id,
      userId: sessionUser.id,
      status: 'active',
      include: [{ model: Meal, include: [{ model: Restaurant }] }],
    },
  });
  console.log(order);

  if (!order) {
    return next(new AppError('Order does not exist with given id', 404));
  }

  res.status(200).json({ order });
});

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
};

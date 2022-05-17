//Import express for routers
const express = require('express');

//Import controllers from user.controller
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
} = require('../controllers/user.controller');

//Import middlewares users
const {
  userExist,
  tokenVerification,
  protectUser,
} = require('../middlewares/user.middleware');

//Import middlewares validatios for create user
const {
  checkValidatios,
  createUserValidations,
} = require('../middlewares/validations');

//init router
const router = express.Router();

//Routers
router.post('/signup', createUserValidations, checkValidatios, createUser);
router.post('/login', loginUser);
router.use(tokenVerification);
router
  .route('/:id')
  .patch(userExist, protectUser, updateUser)
  .delete(userExist, protectUser, deleteUser);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);

module.exports = { userRouter: router };

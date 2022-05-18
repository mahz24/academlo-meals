const express = require('express');

//Controllers
const {
  createOrder,
  ordersUsers,
  orderCompleted,
  OrderCancelled,
} = require('../controllers/order.controller');

//Middlewares
const { tokenVerification } = require('../middlewares/user.middleware');
const { orderExist, protectOrder } = require('../middlewares/order.middleware');

const router = express.Router();

router.use(tokenVerification);

router.post('/', createOrder);
router.get('/me', ordersUsers);

router
  .route('/:id')
  .patch(orderExist, protectOrder, orderCompleted)
  .delete(orderExist, protectOrder, OrderCancelled);

module.exports = { orderRouter: router };

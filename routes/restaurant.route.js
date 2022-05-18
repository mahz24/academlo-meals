//Import libraries
const express = require('express');

//Middlewares
const {
  restaurantExist,
  validateReview,
  protectAdmin,
  protectRestaurant,
} = require('../middlewares/restaurant.middleware');
const { tokenVerification } = require('../middlewares/user.middleware');
const {
  createReviewValidations,
  checkValidatios,
} = require('../middlewares/validations');

// Init router
const router = express.Router();

//Imports funtions from controllers
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/restaurant.controller');

//Restaurant routers
router
  .route('/')
  .post(createReviewValidations, checkValidatios, createRestaurant)
  .get(getAllRestaurants);
router
  .use(tokenVerification)
  .route('/:id')
  .get(restaurantExist, getRestaurantById)
  .patch(restaurantExist, protectAdmin, updateRestaurant)
  .delete(restaurantExist, protectAdmin, deleteRestaurant);

//Reviews routers
router
  .route('/reviews/:id')
  .post(protectRestaurant, createReview)
  .patch(validateReview, updateReview)
  .delete(validateReview, deleteReview);
module.exports = { restaurantRouter: router };

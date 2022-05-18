const express = require('express');

//Middlewares
const {
  restaurantExist,
  protectRestaurant,
} = require('../middlewares/restaurant.middleware');
const { mealExist } = require('../middlewares/meal.middleware');

//Controllers
const {
  getAllMeals,
  addMeal,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');

//Init Router
const router = express.Router();

//Routers
router.get('/', getAllMeals);
router
  .route('/:id')
  .post(restaurantExist, protectRestaurant, addMeal)
  .get(getMealById)
  .patch(mealExist, updateMeal)
  .delete(mealExist, deleteMeal);

module.exports = { mealRouter: router };

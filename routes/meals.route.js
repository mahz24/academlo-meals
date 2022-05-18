const express = require('express');

//Middlewares
const {
  restaurantExist,
  protectRestaurant,
  protectAdmin,
} = require('../middlewares/restaurant.middleware');
const { mealExist } = require('../middlewares/meal.middleware');
const { tokenVerification } = require('../middlewares/user.middleware');
const {
  addMealValidations,
  checkValidatios,
} = require('../middlewares/validations');

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
router.get('/:id', getMealById);

router.use(tokenVerification);

router
  .route('/:id')
  .post(
    restaurantExist,
    protectRestaurant,
    addMealValidations,
    checkValidatios,
    addMeal
  );

router.use(protectAdmin);

router.route('/:id').patch(mealExist, updateMeal).delete(mealExist, deleteMeal);

module.exports = { mealRouter: router };

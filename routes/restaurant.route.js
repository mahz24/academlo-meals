//Import libraries
const express = require('express');

// Init router
const router = express.Router();

//Imports funtions from controllers
const { createRestaurant } = require('../controllers/restaurant.controller');

//Routers
router.post('/', createRestaurant);
module.exports = { restaurantRouter: router };

//Extentions
const express = require('express');

//Export errors precessor
const { globalErrorHandler } = require('./controllers/errors.controller');

//Export routers
const { userRouter } = require('./routes/user.route');
const { restaurantRouter } = require('./routes/restaurant.route');
const { mealRouter } = require('./routes/meals.route');

//Init express app
const app = express();

//Enable incoming Json data
app.use(express.json());

//Routers of app
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);

//Errors driving
app.use('*', globalErrorHandler);

module.exports = { app };

//Extentions
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//Export errors precessor
const { globalErrorHandler } = require('./controllers/errors.controller');

//Export routers
const { userRouter } = require('./routes/user.route');
const { restaurantRouter } = require('./routes/restaurant.route');
const { mealRouter } = require('./routes/meals.route');
const { orderRouter } = require('./routes/order.route');

//Init express app
const app = express();

//Enable incoming Json data
app.use(express.json());

//Libraries for production
app.use(helmet());
app.use(compression());

//Log incoming requests
if (process.env.NODE_ENV === 'develoment') app.use(morgan('dev'));
else app.use(morgan('combined'));

//Routers of app
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

//Errors driving
app.use('*', globalErrorHandler);

module.exports = { app };

//Models
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Restaurant } = require('./restaurant.model');
const { Review } = require('./review.model');
const { User } = require('./user.model');

//Relations
const modelsRelations = () => {
  //restaurant to meals and meals to restaurant
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  //meal to order and order to meal
  Meal.hasOne(Order);
  Order.belongsTo(Meal);

  //user to order and order to user
  User.hasOne(Order);
  Order.belongsTo(User);

  //user to reviews and reviews to user
  User.hasMany(Review);
  Review.belongsTo(User);

  //restaurant to reviews and reviews to restaurant
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);
};

module.exports = { modelsRelations };

//Models
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Restaurant } = require('./retaurant.model');
const { Review } = require('./review.model');
const { User } = require('./user.model');

//Relations
const modelsRelations = () => {
  //restaurant to meals and meals to restaurant
  Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
  Meal.belongsTo(Restaurant);

  //meal to order and order to meal
  Meal.hasOne(Order, { foreignKey: 'mealId' });
  Order.belongsTo(Meal);

  //user to order and order to user
  User.hasOne(Order, { foreignKey: 'userId' });
  Order.belongsTo(User);

  //user to reviews and reviews to user
  User.hasMany(Review, { foreignKey: 'userId' });
  Review.belongsTo(User);

  //restaurant to reviews and reviews to restaurant
  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant);
};

module.exports = { modelsRelations };

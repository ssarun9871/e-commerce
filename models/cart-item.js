const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  prodId:{
   type:Sequelize.INTEGER,
   allowNull:false
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
 
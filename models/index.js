const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = {
  Sequelize,
  sequelize,
  User: require('./user')(sequelize, Sequelize, DataTypes),
  Todo: require('./todo')(sequelize, Sequelize, DataTypes),
};
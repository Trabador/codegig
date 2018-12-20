const Sequelize = require('sequelize');
const config = require('./variables')

module.exports = new Sequelize(config.DBNAME, config.DBUSER, config.DBPASS, {
  host: config.HOST,
  dialect: config.DIALECT,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
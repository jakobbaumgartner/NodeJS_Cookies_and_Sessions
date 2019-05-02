const Sequelize = require('sequelize')
const sequelize = require('../database/database')


const users = sequelize.define('users', {
	// attributes
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	ime: {
	  type: Sequelize.STRING
	},
	geslo: {
	  type: Sequelize.STRING
	  // allowNull defaults to true
	}
  }
  );

  module.exports = users

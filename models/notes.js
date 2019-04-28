const Sequelize = require('sequelize')
const sequelize = require('../database/database')



const notes = sequelize.define('notes', {
	// attributes
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false, 
		primaryKey: true
	},
	naslov: {
	  type: Sequelize.STRING
	},
	tekst: {
	  type: Sequelize.STRING
	  // allowNull defaults to true
	}
  }
  );

  module.exports = notes

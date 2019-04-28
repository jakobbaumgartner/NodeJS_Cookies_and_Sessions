const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('jnotes_db', 'root', 'brun13cajt', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize
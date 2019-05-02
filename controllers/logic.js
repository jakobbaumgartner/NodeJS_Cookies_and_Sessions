const express = require('express');
const expressHbs = require('express-handlebars');
const bodyparser = require('body-parser')
const Sequelize = require('sequelize')
const path = require('path')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sequelize = require('../database/database')
const notes = require('../models/notes')
const users = require('../models/users')
const controllers = require('../controllers/modify')

module.exports.checkSession = (req, res) => {
	var userId = req.session.userId
	var userData = null


	if (userId != null) {

		userData = notes.findAll({
			where: {
				id: userId
			}
		});

		res.render('home', { id0: '?', listanaslovov: [] });
		console.log('HOME RENDERED')
	}

	else {

		res.redirect('/loginpage');
		console.log('REDIRECTED LOGINPAGE')


	}
}

module.exports.clickLogin = (req, res) => {
	var HashId = req.body.ime + '2019' + req.body.geslo
	var ime = req.body.ime
	var geslo = req.body.geslo
	// search for attributes
	users.findOne({ where: { id: HashId } }).then(user => {
		// user will be the first entry of the users table with the id 'HashId' || null
		var userexists = user

		req.session.userId = HashId
		req.session.newId = true
		req.session.ime = req.body.ime
		req.session.geslo = req.body.geslo

		console.log('userexists: ' + userexists)

		if (userexists != null) {

			//shrani v session info in se premakne na glavno stran
			res.redirect('/');
		}

		else {
			res.redirect('/loginpage');
		}


	})


}
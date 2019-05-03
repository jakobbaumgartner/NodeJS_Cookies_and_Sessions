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

	// preveri, če je user prijavljen
	if (userId != null) {

		userData = notes.findAll({
			where: {
				userId: userId
			},
			raw: true
		}).then(data => {

			console.log('HOME RENDERED')
			
		
			console.log(req.session.notetekst)
			console.log(req.body.newnotetrue)

			if (req.session.newnotetrue == true) {
				// ustvarjamo nov zapis
				req.session.newnotetrue = false
				req.session.notenaslov = ''
				req.session.notetekst = ''
			}

			console.log('NEWIDDD: ' + req.session.opennote)
			console.log(req.session.notenaslov)
			res.render('home', { id0: req.session.ime , data: data, naslovpolje: req.session.notenaslov, tekstpolje: req.session.notetekst});


		})


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
		// preverimo če uporabnik obstaja
		// user will be the first entry of the users table with the id 'HashId' || null
		var userexists = user

		// shranimo uporabnika v session
		req.session.userId = HashId
		req.session.ime = req.body.ime
		req.session.geslo = req.body.geslo

		console.log('userexists: ' + userexists)

		if (userexists != null) {

			//shrani v session info in se premakne na glavno stran
			res.redirect('/');

		}

		else {
			if (req.body.confirm == 'CONFIRM') {
				// če se zatipkamo ali ustvarjamo novega uporabnika moramo še enkrat potrditi, 
				// nato ustvarimo novega uporabnika
				users.create({ id: HashId, ime: req.session.ime, geslo: req.session.geslo }).then(user => {
					// you can now access the newly created task via the variable task
					console.log('New user created:' + user)
				})

				res.redirect('/');
			}


			else {
				req.session.newId = true
				res.redirect('/loginpage');
			}


		}


	})


}


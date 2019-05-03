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
				userId: userId
			},
			raw: true
		}).then(data => {

			console.log('HOME RENDERED')
			
			var datafine = this.createViewsData(data)
			console.log(req.session.notenaslov)
			console.log(req.body.newnotetrue)

			if (req.session.newnotetrue == true) {
				req.session.newnotetrue = false
				req.session.notenaslov = ''
				req.session.notetekst = ''
			}

			console.log('ime  ' + req.session.ime + '  geslo  ' + req.session.geslo + ' data ' + data)
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
		// user will be the first entry of the users table with the id 'HashId' || null
		var userexists = user

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

module.exports.createViewsData = (data) => {

	// funkcija predela dobljena sporočila v tri objekte arraya ( naslovi in vsebine in id), 
	// ki jih returna v skupnem arrayu

	var length0 = data.length

	var naslovi = []
	var vsebine = []
	var id = []

	for( var x = 0; x < length0; x++ ) {
		naslovi.push(data[x].naslov)
		vsebine.push(data[x].tekst)
		id.push(data[x].id)
	}

	return [naslovi, vsebine, id]
}


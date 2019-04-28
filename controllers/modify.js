const express = require('express')
const router = express.Router()
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = require('../database/database')
const notes =  require('../models/notes')
const users =  require('../models/users')


router.get('/newnote', (req, res) => {
	res.render('home', 
	{id0: '', listanaslovov: ''});
});

router.post('/shrani', (req, res) => {
	if(req.body.naslov != '') {
			
				
				notes.create({naslov: req.body.naslov, tekst: req.body.vsebina})
				console.log('WESAVEDIT')
			
	}

});

function loggedincheck () {
	if (userhashid = "") {
		req.session.logedin = false
		}
	else {
		req.session.logedin = true
	}
}

function skrajsaninaslovi () {
	//skrajša dolžino naslovov za listo

	var listanaslovov = new Array;
	

	for (let index = 0; index < notesproto0.length; index++) {
		var trenutennaslov = (notesproto0[index].naslov).substring(0,20)

		if (((notesproto0[index].naslov).length) > 20) {
			trenutennaslov = trenutennaslov + "..."
		}

		listanaslovov.push(trenutennaslov)
	
	}
}

module.exports.router = router 
module.exports.loggedincheck = loggedincheck
module.exports.skrajsaninaslovi = skrajsaninaslovi
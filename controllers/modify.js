const express = require('express')
const router = express.Router()
const bodyparser =  require('body-parser')
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = require('../database/database')
const notes =  require('../models/notes')
const users =  require('../models/users')
const logic = require('../controllers/logic')


router.get('/newnote', (req, res) => {
	res.render('home', 
	{id0: '', listanaslovov: ''});
});

router.post('/shrani', (req, res) => {
	if(req.body.naslov != '') {
			
				
				notes.create({naslov: req.body.naslov, tekst: req.body.vsebina, userId: req.session.userId})
				console.log('WESAVEDIT')

				 res.redirect('/');
			
	}

});

router.post('/loginuser', (req, res) => {
	logic.clickLogin(req, res)
	console.log('ime: ' + req.body.ime + '     geslo: ' + req.body.geslo)
});

router.post('/odpri', (req, res) => {

	console.log("BODYLOG")
	console.log(req.body.id)
	console.log(req.body.chosenbutton)

	req.session.opennote = req.body.id

	if (req.body.chosenbutton != undefined ) {
		console.log('not undefined')
	}

	else {
		console.log('undefineddddd')
		notes.destroy({
			where: {
			  id: req.body.id
			}
		  }).then(() => {
			console.log("Note Destroyed.");
		  });
	}

	 res.redirect('/');
});

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



module.exports.skrajsaninaslovi = skrajsaninaslovi
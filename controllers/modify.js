const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = require('../database/database')
const notes = require('../models/notes')
const users = require('../models/users')
const logic = require('../controllers/logic')


router.get('/newnote', (req, res) => {
	req.session.newnotetrue = true
	req.session.opennote = ''
	logic.checkSession(req, res)



});

router.post('/shrani', (req, res) => {
	console.log('naslov ---->>>>>' + req.session.opennote)
	if (req.body.naslov != '') {

		if (req.session.opennote != '') {

			notes.findOne({
				where: {
					id: req.session.opennote,
					userId: req.session.userId
				}}).then(note => {
					note.update({
						naslov: req.body.naslov,
						tekst: req.body.vsebina
					})

					req.session.notenaslov = req.body.naslov
					req.session.notetekst = req.body.vsebina
					console.log(req.body.vsebina + '   ' + req.session.notetekst)
					
					
					console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!=================')

					res.redirect('/');
					
				})
				

		}

		else {
			console.log('------->>>' + req.session.userId)
			notes.create({ naslov: req.body.naslov, tekst: req.body.vsebina, userId: req.session.userId })

			res.redirect('/');
		}

	

	}

	else {
		res.redirect('/');
	}

});

router.post('/loginuser', (req, res) => {
	req.session.opennote = ''
	logic.clickLogin(req, res)
	console.log('ime: ' + req.body.ime + '     geslo: ' + req.body.geslo)
});

router.post('/odpri', (req, res) => {

	console.log("BODYLOG")
	console.log(req.body.id)
	console.log(req.body.chosenbutton)

	req.session.opennote = req.body.id

	if (req.body.chosenbutton != undefined) {
		console.log('not undefined')

		notes.findOne({
			where: {
				id: req.body.id
			},
			raw: true
		}).then(note => {


			req.session.notetekst = note.tekst

			req.session.notenaslov = note.naslov

			res.redirect('/');
		})

	}

	else {

		notes.destroy({
			where: {
				id: req.body.id
			}
		}).then(() => {
			console.log("Note Destroyed.");

			req.session.notetekst = ''

			req.session.notenaslov = ''
			res.redirect('/');
		});
	}


});

// function skrajsaninaslovi () {
// 	//skrajša dolžino naslovov za listo

// 	var listanaslovov = new Array;


// 	for (let index = 0; index < notesproto0.length; index++) {
// 		var trenutennaslov = (notesproto0[index].naslov).substring(0,20)

// 		if (((notesproto0[index].naslov).length) > 20) {
// 			trenutennaslov = trenutennaslov + "..."
// 		}

// 		listanaslovov.push(trenutennaslov)

// 	}
// }

// module.exports.skrajsaninaslovi = skrajsaninaslovi


module.exports.router = router




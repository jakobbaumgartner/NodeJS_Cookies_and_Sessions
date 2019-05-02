const express = require('express');
const expressHbs = require('express-handlebars');
const bodyparser =  require('body-parser')
const Sequelize = require('sequelize')
const path = require('path')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const sequelize = require('./database/database')
const notes =  require('./models/notes')
const users =  require('./models/users')
const controllers = require('./controllers/modify')
const logic = require('./controllers/logic')

const app = express();

// vzpostavimo modele v bazi

sequelize.sync().then(result => {
	console.log("SYNC INITIATED")
}).catch(err => {
	console.log(err)
})

// vzpostavimo session sistem in povežemo z mysql bazo

app.use(session({
	secret: 'keyboard cat',
	store: new SequelizeStore({
	  db: sequelize
	}),
	resave: false, // we support the touch method so per the express-session docs this should be set to false
	proxy: true // if you do SSL outside of node.
  }))


// dataparser and static folder designation

app.use(bodyparser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

// views engine settings

app.engine(
  'hbs',
  expressHbs({
    // layoutsDir: 'views/layouts/',
    // defaultLayout: 'main-layout',
    extname: 'hbs'
  })
);

app.set('view engine', 'hbs');
app.set('views', 'views');


// user-input

app.use('/posodobi', controllers.router)


//glavna stran render
app.get('/', (req, res) => {

	req.session.userId = 'fdfd'

	console.log('USERID = !!!!!!!!!!!! ' + req.session.userId)

	var checkS = logic.checkSession(req, res)

	//skrajša dolžino naslovov za listo

			var listanaslovov = new Array;
	
			var notesproto0 = new Array

			for (let index = 0; index < notesproto0.length; index++) {
				var trenutennaslov = (notesproto0[index].naslov).substring(0,20)

				if (((notesproto0[index].naslov).length) > 20) {
					trenutennaslov = trenutennaslov + "..."
				}

				listanaslovov.push(trenutennaslov)
			
				
			}

});


// login stran render
app.get('/loginpage', (req, res) => {

	if(req.session.newId == true) {
		var popmessage = ''}

	else {
		req.session.geslo = ''
		req.session.ime = ''
		req.session.userId = ''

		}


	res.render('login', {
		geslo: req.session.geslo,
		ime: req.session.ime,
		popupmessage: popmessage
	});
	
	console.log('LOGIN RENDERED')
});


// server start 

app.listen(3000, () => {
	console.log(`SERVER STARTED`);
});
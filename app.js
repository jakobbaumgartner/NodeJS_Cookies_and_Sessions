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

users.hasMany(notes)

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

	req.session.newId = false

	console.log('USERID = !!!!!!!!!!!! ' + req.session.userId)

	var checkS = logic.checkSession(req, res)

			

});


// login stran render
app.get('/loginpage', (req, res) => {

	var buttonlog = 'Login'
	if(req.session.newId == true) {
		buttonlog = 'CONFIRM'
	}
			

	res.render('login', {
		geslo: req.session.geslo,
		ime: req.session.ime,
		buttonlog: buttonlog
	});
	
	console.log('LOGIN RENDERED')
});


// server start 

app.listen(3000, () => {
	console.log(`SERVER STARTED`);
});
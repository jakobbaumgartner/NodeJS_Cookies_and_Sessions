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

const app = express();



sequelize.sync().then(result => {
	console.log("SYNC INITIATED")
}).catch(err => {
	console.log(err)
})


app.use(session({
	secret: 'keyboard cat',
	store: new SequelizeStore({
	  db: sequelize
	}),
	resave: false, // we support the touch method so per the express-session docs this should be set to false
	proxy: true // if you do SSL outside of node.
  }))




app.use(bodyparser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))


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




var notesproto0 = [
{naslov: "aaaaaaaaaaaaaaaaaaab"},
{naslov: "Peter"},
{naslov:"CEne"},
{naslov: "aaaaaaaaaaaaaaaaaaab"},
{naslov: "Peter"},
{naslov:"CEne"},
{naslov: "aaaaaaaaaaaaaaaaaaab"},
{naslov: "Peter"},
{naslov:"CEne"},
{naslov: "aaaaaaaaaaaaaaaaaaab"},
{naslov: "Peter"},
{naslov:"CEne"},
{naslov: "aaaaaaaaaaaaaaaaaaab"}



]

app.use('/posodobi', controllers.router)


//glavna stran render
app.get('/', (req, res) => {


	req.session.id66 = "ratata"
	console.log(req.session.id66)

	//skrajša dolžino naslovov za listo

			var listanaslovov = new Array;
	

			for (let index = 0; index < notesproto0.length; index++) {
				var trenutennaslov = (notesproto0[index].naslov).substring(0,20)

				if (((notesproto0[index].naslov).length) > 20) {
					trenutennaslov = trenutennaslov + "..."
				}

				listanaslovov.push(trenutennaslov)
			
				
			}



	res.render('home', {id0: '?', listanaslovov: listanaslovov});
	console.log('HOME RENDERED')
	req.session.ime = "Jakob"
});

app.get('/loginpage', (req, res) => {
	res.render('login');
	console.log('LOGIN RENDERED')
});


app.listen(3000, () => {
	console.log(`SERVER STARTED`);
});
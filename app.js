const express = require('express');
const expressHbs = require('express-handlebars');
const bodyparser =  require('body-parser')

const app = express();

app.use(express.static('public'))

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


//glavna stran
app.get('/', (req, res) => {
	console.log(notesproto0[0].naslov)

	//skrajša dolžino naslovov za listo

	var listanaslovov = new Array;

	for (let index = 0; index < notesproto0.length; index++) {
		var trenutennaslov = (notesproto0[index].naslov).substring(0,20)

		if (((notesproto0[index].naslov).length) > 20) {
			trenutennaslov = trenutennaslov + "..."
		}

		listanaslovov.push(trenutennaslov)
		
		console.log(listanaslovov)
		
	}



	res.render('home', {id0: '?', listanaslovov: listanaslovov});
});

app.post('/loginpage', (req, res) => {
	res.render('login');
});


app.listen(3000, () => {
	console.log(`Server started on port`);
});
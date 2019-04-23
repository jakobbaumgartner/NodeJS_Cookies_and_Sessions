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

app.get('/', (req, res) => {
	res.render('home', {id0: 'test'});
});




app.listen(3000, () => {
	console.log(`Server started on port`);
});
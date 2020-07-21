const express = require('express');

//create app
const app = express();

//listen to port 3000
app.listen(3000);

//static files
app.use('/public', express.static('public'));

//set view engine
app.set('view engine', 'ejs');

//get requests
app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/pokemon/:name', (req, res)=>{
  res.render('pokemon-moveset', {name: req.params.name});
});

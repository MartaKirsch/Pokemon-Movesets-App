const express = require('express');
const mongoose = require('mongoose');
const addRoutes = require('./routes/addRoutes');
const movesetsRoutes = require('./routes/movesetsRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');
const accountRoutes = require('./routes/accountRoutes');
const session = require('express-session');

//create app
const app = express();

//db link & listen to port 3000 ?retryWrites=true&w=majority
let dbURI = '';

//heroku stuff
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
else
{
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then((result)=>{console.log('connected to db');app.listen(port);})
  .catch((err)=>{console.log('there is an error: '+err);});


//static files
app.use('/public', express.static('public'));

//set view engine
app.set('view engine', 'ejs');

//session
app.use(session({secret: 'ssshhhhh', resave:true, saveUninitialized: false}));

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//get requests
app.get('/', (req, res)=>{
  res.render('index');
});


//use the addRoutes.js file for incoming requests with '/add', etc
app.use('/add', addRoutes);
app.use('/movesets', movesetsRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/account', accountRoutes);

//404 Page
app.use((req,res)=>{
  res.status(404).render('404');
});

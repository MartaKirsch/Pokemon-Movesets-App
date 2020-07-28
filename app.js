const express = require('express');
const mongoose = require('mongoose');
const addRoutes = require('./routes/addRoutes');
const movesetsRoutes = require('./routes/movesetsRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');

//create app
const app = express();

//db link & listen to port 3000
const dbURI = 'mongodb+srv://pandeu:alabala00@cluster0.whmux.mongodb.net/movesetsApp';

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then((result)=>{console.log('connected to db');app.listen(3000);})
  .catch((err)=>{console.log('there is an error: '+err);});


//static files
app.use('/public', express.static('public'));

//set view engine
app.set('view engine', 'ejs');



//get requests
app.get('/', (req, res)=>{
  res.render('index');
});





//use the addRoutes.js file for incoming requests with '/add', etc
app.use('/add', addRoutes);
app.use('/movesets', movesetsRoutes);
app.use('/pokemon', pokemonRoutes);

//404 Page
app.use((req,res)=>{
  res.status(404).render('404');
});

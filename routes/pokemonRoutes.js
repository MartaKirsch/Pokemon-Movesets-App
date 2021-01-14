const express = require('express');
const pokemonController = require('../controllers/pokemonController.js');
const bodyParser = require('body-parser');

//bodyParser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//create router
const router = express.Router();


router.get('/:name', pokemonController.loadPokeDBinfo);
router.get('/loadInfo/:id', pokemonController.loadInfo);
router.get('/getItem/:name', pokemonController.getItem);

// router.get('/loadData/:name', pokemonController.loadData);


module.exports = router;

const express = require('express');
const movesetsController = require('../controllers/movesetsController.js');
const bodyParser = require('body-parser');

//bodyParser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//create router
const router = express.Router();


router.get('/load/:name/:id', movesetsController.loadMovesetsList);


module.exports = router;

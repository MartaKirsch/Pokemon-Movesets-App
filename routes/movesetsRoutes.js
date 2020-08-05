const express = require('express');
const movesetsController = require('../controllers/movesetsController.js');
const bodyParser = require('body-parser');

//bodyParser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//create router
const router = express.Router();


router.get('/load/:name/:id/:account', movesetsController.loadMovesetsList);
router.get('/loadAll/:name', movesetsController.loadAllMovesetsList);

router.get('/:name/:id', movesetsController.loadMoveset)

module.exports = router;

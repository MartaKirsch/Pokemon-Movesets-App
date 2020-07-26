const express = require('express');
const addController = require('../controllers/addController.js');
const bodyParser = require('body-parser');

//bodyParser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//create router
const router = express.Router();


router.get('/', urlencodedParser, addController.add_index);


router.post('/', urlencodedParser, addController.add_post);

router.get('/check/:name', addController.add_check);

module.exports = router;

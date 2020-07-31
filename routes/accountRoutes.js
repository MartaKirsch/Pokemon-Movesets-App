const express = require('express');
const accountController = require('../controllers/accountController.js');
const bodyParser = require('body-parser');

//bodyParser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

//create router
const router = express.Router();


router.get('/', accountController.account_index);
router.get('/checkData/:nickname/:password', accountController.account_checkData);
router.get('/logout', accountController.account_logOut);
router.get('/check-if-exists/:nickname', accountController.account_checkIfExists);
router.get('/load-movesets/:id', accountController.account_loadMovesets);

router.post('/register', urlencodedParser, accountController.account_register);


module.exports = router;

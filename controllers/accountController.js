const Account = require('../models/accountModel.js');
const fetch = require('node-fetch');
const session = require('express-session');

const account_index = (req, res) => {
  let sess = req.session;

  if(sess.login)
  {
    res.render('account');
  }
  else
  {
    res.render('logIn');
  }
};

const account_checkData = (req, res) => {
  let sess = req.session;
  console.log('checking data');

  sess.login = true;
  res.json({mssg:'hello'});

};

const account_logOut = (req, res) => {
  req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

};

const account_checkIfExists = (req, res) => {

  Account.find({name: req.params.nickname}).then((docs)=>{
    console.log(docs);
    if(docs)
    {
      res.json({status:'404'});
    }
    else
    {
      res.json({status:'OK'});
    }
  });

};

const account_register = (req, res) => {

  let sess = req.session;

  let account = new Account({
    name: req.body.nickname,
    password: req.body.password
  });
  console.log('about to register');
  account.save()
    .then((result)=>{
      sess.login = req.body.nickname;
      res.redirect('/account');
    })
    .catch((err)=>{
      console.log(err);
    });

};

module.exports = {
  account_index,
  account_checkData,
  account_logOut,
  account_checkIfExists,
  account_register
};

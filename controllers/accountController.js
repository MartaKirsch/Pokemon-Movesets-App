const Account = require('../models/accountModel.js');
const Moveset = require('../models/movesetModel.js');
const fetch = require('node-fetch');
const session = require('express-session');

const account_index = (req, res) => {
  let sess = req.session;

  if(sess.login)
  {
    res.render('account',{nickname: sess.login});
  }
  else
  {
    res.render('logIn');
  }
};

const account_checkData = (req, res) => {
  let sess = req.session;
  console.log('checking data');

  Account.find({name: req.params.nickname, password: req.params.password}).then(docs=>{

    if(docs.length!=0)
    {
      sess.login = req.params.nickname;
      res.json({status:'OK'});
    }
    else
    {
      res.json({status:'404'});
    }
  });


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

  Account.find({"name_lowercase": req.params.nickname.toLowerCase()}).then((docs)=>{

    if(docs.length!=0)
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
    "name_lowercase": req.body.nickname.toLowerCase(),
    password: req.body.password
  });

  account.save()
    .then((result)=>{
      sess.login = req.body.nickname;
      res.redirect('/account');
    })
    .catch((err)=>{
      console.log(err);
    });

};

const account_loadMovesets = async (req, res) => {
  let sess = req.session;

  let id = parseInt(req.params.id, 10);
  let data = await Moveset.find({author:sess.login}).skip(id).limit(10).sort( 'createdOn' );
  res.json(data);
};

module.exports = {
  account_index,
  account_checkData,
  account_logOut,
  account_checkIfExists,
  account_register,
  account_loadMovesets
};

const Moveset = require('../models/movesetModel.js');
const session = require('express-session');

const add_index = (req, res) => {
  let sess = req.session;

  if(sess.login)
  {
    res.render('add', {type:"add"});
  }
  else
  {
    res.redirect('/account');
  }
};

const saveMoveset = (moveset, res) => {
  //save the moveset to the db
  moveset.save()
    .then((result)=>{
      res.redirect('/');
    })
    .catch((err)=>{
      console.log(err);
    });
};

const add_post = (req, res) => {
  let sess = req.session;

  //get the data
  const data = req.body;
  //add moves to an array
  let moves = [{name: data.move1}, {name: data.move2}, {name: data.move3}, {name: data.move4}];
  //get evs and add them to an array
  let stats = [{}];

  if (data['stat[]'][0].length>1)
  {
    for(let i=0; i<data['stat[]'].length; i++)
    {
      let val = parseInt(data['value[]'][i],10);
      let stat = data['stat[]'][i].toString();
      stats[i] = {stat: stat, value:val};
    }
  }
  else
  {
    let val = parseInt(data['value[]'],10);
    let stat = data['stat[]'].toString();
    stats[0] = {stat: stat, value:val};
  }


  //create new moveset
  const moveset = new Moveset({
    "name": data.name.toLowerCase(),
    "heldItem": data.heldItem,
    "ability": data.ability,
    "EVs": stats,
    "nature": data.nature,
    "moves": moves,
    "movesetName": data.movesetName,
    "movesetNameLowercase": data.movesetName.toLowerCase(),
    "author": sess.login
  });

  if(data.movesetName=="")
  {
    //find how many movesets for this pokemon this author already has and do sth like msName = "author#(num+1)"
    let reg = new RegExp("^"+sess.login+'#\\d+$');
    Moveset.find({ name: data.name.toLowerCase(), author: sess.login, movesetName: reg}).sort( 'createdOn' ).then((docs)=>{

      //get the biggest num after # from returned docs
      let buffor = 0;
      let reg2 = /\d+$/;
      docs.forEach((ms) => {
        let num = parseInt(ms.movesetName.match(reg2).toString());
        if(num>buffor)
        {
          buffor = num;
        }
      });

      //set a new name and save
      moveset.movesetName = `${sess.login}#${buffor+1}`;
      moveset.movesetNameLowercase = `${sess.login}#${buffor+1}`.toLowerCase();
      saveMoveset(moveset, res);

    });
  }
  else
  {
    saveMoveset(moveset, res);
  }
};

const add_check = (req, res) => {
  let sess = req.session;
  let name = req.body.name;

  name = name.toLowerCase();

  //check if set name isn't prohibited
  let reg = new RegExp(sess.login + "#\\d+", 'i');


  if(reg.test(name))
  {
    res.json({value: "prohibited"});
  }
  else
  {
    //check if moveset with identical name exists
    Moveset.find({ movesetName: name}, (err, docs)=>{
      if(docs.length==0)
      {
        res.json({value: "no-exist"});
      }
      else
      {
        res.json({value: "exists"});
      }
    });
  }


};



module.exports = {
  add_index,
  add_post,
  add_check
}
